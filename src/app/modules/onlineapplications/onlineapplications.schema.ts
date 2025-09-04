import { z } from 'zod';
import { ONLINEAPPLICATIONS_STATUS } from './onlineapplications.constant';

const createOnlineapplications = z.object({
  body: z.object({
    studentNameBangla: z.string({ required_error: 'Student name (Bangla) is required' }),
    studentNameEnglish: z.string({ required_error: 'Student name (English) is required' }),
    fatherNameBangla: z.string({ required_error: 'Father name (Bangla) is required' }),
    fatherNameEnglish: z.string({ required_error: 'Father name (English) is required' }),
    motherNameBangla: z.string({ required_error: 'Mother name (Bangla) is required' }),
    motherNameEnglish: z.string({ required_error: 'Mother name (English) is required' }),
    fatherAnnualIncome: z.string({ required_error: 'Father annual income is required' }),
    dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
    birthPlace: z.string({ required_error: 'Birth place is required' }),
    nationality: z.string({ required_error: 'Nationality is required' }),
    religion: z.string({ required_error: 'Religion is required' }),
    gender: z.string({ required_error: 'Gender is required' }),
    maritalStatus: z.string({ required_error: 'Marital status is required' }),
    presentAddress: z.string({ required_error: 'Present address is required' }),
    permanentAddress: z.string({ required_error: 'Permanent address is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    alternateWhatsAppNumber: z.string({ required_error: 'Alternate WhatsApp number is required' }),
    lastExamPassed: z.string({ required_error: 'Last exam passed is required' }),
    passingYear: z.string({ required_error: 'Passing year is required' }),
    board: z.string({ required_error: 'Board is required' }),
    rollNumber: z.string({ required_error: 'Roll number is required' }),
    registrationNumber: z.string({ required_error: 'Registration number is required' }),
    gpa: z.string({ required_error: 'GPA is required' }),
    desiredClass: z.string({ required_error: 'Desired class is required' }),
    desiredGroup: z.string({ required_error: 'Desired group is required' }),
    previousSchool: z.string({ required_error: 'Previous school is required' }),
    guardianName: z.string({ required_error: 'Guardian name is required' }),
    guardianRelation: z.string({ required_error: 'Guardian relation is required' }),
    guardianOccupation: z.string({ required_error: 'Guardian occupation is required' }),
    guardianPhone: z.string({ required_error: 'Guardian phone is required' }),
    guardianAddress: z.string({ required_error: 'Guardian address is required' }),
    medicalInfo: z.string().optional(),
    specialComments: z.string().optional(),
    declaration: z.boolean({ required_error: 'Declaration is required' }),
    recommendation: z.string().optional(),
    transferCertificateNumber: z.string({
      required_error: 'Transfer certificate number is required',
    }),
    transferCertificateDate: z.string({ required_error: 'Transfer certificate date is required' }),
    birthRegistrationNumber: z.string({ required_error: 'Birth registration number is required' }),
    studentPhotoUrl: z.string().url({ message: 'Invalid URL format for student photo' }).optional(),
    studentSignatureUrl: z
      .string()
      .url({ message: 'Invalid URL format for student signature' })
      .optional(),
    guardianSignatureUrl: z
      .string()
      .url({ message: 'Invalid URL format for guardian signature' })
      .optional(),
    // IMPORT STATUS CONSTANT FROM CONSTANT FILE
    applicationStatus: z
      .enum(Object.values(ONLINEAPPLICATIONS_STATUS) as [string, ...string[]])
      .optional()
      .default(ONLINEAPPLICATIONS_STATUS.PENDING),
  }),
});

const updateOnlineapplications = z.object({
  body: createOnlineapplications.shape.body.partial(),
});

export const onlineapplicationsSchema = {
  createOnlineapplications,
  updateOnlineapplications,
};

// Type export for mongoose schema
export type IOnlineapplications = z.infer<typeof createOnlineapplications>['body'];
