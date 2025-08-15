import { BadRequestError, ForbiddenError, UnauthorizedError } from '@/app/errors/apiError';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../user/user.model';
import { verifyToken } from '@/utils/token/token';
import { SessionModel } from '../session/session.model';
import { getDeviceInfoFromRequest } from '@/app/helper/getDeviceInfoFromRequest';
import { UserRole } from '../user/user.constant';
import { DeviceInfo } from './auth.interface';
import useragent from 'useragent';
import geoip from 'geoip-lite';

// TODO : after change password

const isAuthenticated = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw UnauthorizedError('Access token missing');
    }

    const data = verifyToken(accessToken);

    if (!data?.user?._id || !data.sessionId) {
      throw UnauthorizedError('Invalid token payload');
    }

    const session = await SessionModel.findOne({ sessionId: data.sessionId });

    if (!session || !session.expiresAt || session.expiresAt < new Date()) {
      throw UnauthorizedError('Session is invalid or expired');
    }

    const currentDeviceInfo = getDeviceInfoFromRequest(req);

    const storedIp = session?.deviceInfo?.ip;
    const currentIp = normalizeIp(currentDeviceInfo.ip);

    const sameDevice =
      session.deviceInfo?.browser === currentDeviceInfo.browser &&
      session.deviceInfo?.os === currentDeviceInfo.os;

    const sameIp =
      isSameSubnet(storedIp ?? '0.0.0.0', currentIp ?? '0.0.0.0', 2) ||
      isSameRegion(storedIp ?? '0.0.0.0', currentIp ?? '0.0.0.0');

    if (!sameDevice || !sameIp) {
      throw UnauthorizedError('Device or location mismatch. Unauthorized access.');
    }

    req.user = {
      _id: data.user._id,
      sessionId: data.sessionId,
    };

    next();
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (err) {
    next(UnauthorizedError('Authentication failed'));
  }
};

const isLogOut = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) return next();

    const decoded = verifyToken(token);

    if (!decoded?.user?._id || !decoded.sessionId) return next();

    const session = await SessionModel.findOne({ sessionId: decoded.sessionId });

    if (!session || !session.expiresAt || session.expiresAt < new Date()) {
      return next();
    }

    throw BadRequestError('User already logged in');
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next();
    }

    next(error);
  }
};

const hasRole =
  (...allowedRoles: UserRole[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user?._id) throw UnauthorizedError('User not authenticated');

      const user = await UserModel.findById(req.user._id, { role: 1 }).lean().exec();

      if (!user) throw UnauthorizedError('User disappeared');

      if (allowedRoles.length && !allowedRoles.includes(user.role as UserRole)) {
        throw ForbiddenError('Access Denied');
      }

      next();
    } catch (err) {
      next(err);
    }
  };

const getClientIp = (req: Request): string => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (typeof xForwardedFor === 'string' && xForwardedFor.length > 0) {
    const ips = xForwardedFor.split(',').map((ip) => ip.trim());

    for (const ip of ips) {
      if (ip && ip.toLowerCase() !== 'unknown') return ip;
    }
  }

  return req.socket?.remoteAddress || req.connection?.remoteAddress || '0.0.0.0';
};

const normalizeIp = (ip: string): string => {
  if (!ip) return '0.0.0.0';

  if (ip === '::1' || ip === '::ffff:127.0.0.1') return '127.0.0.1';

  if (ip.startsWith('::ffff:')) return ip.substring(7);

  return ip;
};

const detectDeviceInfo = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const rawUserAgent = req.headers['user-agent'] || '';
    const agent = useragent.parse(rawUserAgent);

    const ipRaw = getClientIp(req);
    const ip = normalizeIp(ipRaw);

    const deviceInfo: DeviceInfo = {
      browser: agent.toAgent() || 'Unknown browser',
      os: agent.os.toString() || 'Unknown OS',
      ip,
    };

    req.deviceInfo = deviceInfo;

    if (process.env.NODE_ENV !== 'production') {
      console.debug('🛰️ Device Info:', deviceInfo);
    }

    next();
  } catch (error) {
    console.error('Error in detectDeviceInfo middleware:', error);
    next();
  }
};

export function isSameSubnet(ip1: string, ip2: string, matchOctets = 2): boolean {
  if (!ip1 || !ip2) return false;

  const parts1 = ip1.split('.');
  const parts2 = ip2.split('.');

  if (parts1.length !== 4 || parts2.length !== 4) return false;

  for (let i = 0; i < matchOctets; i++) {
    if (parts1[i] !== parts2[i]) {
      return false;
    }
  }

  return true;
}

export function isSameRegion(ip1: string, ip2: string): boolean {
  const loc1 = geoip.lookup(ip1);
  const loc2 = geoip.lookup(ip2);

  if (!loc1 || !loc2) return false;

  return loc1.country === loc2.country && loc1.region === loc2.region;
}

export const authMiddlewares = {
  isAuthenticated,
  isLogOut,
  hasRole,
  detectDeviceInfo,
};
