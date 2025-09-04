import { IOnlineapplications } from './onlineapplications.schema';
import OnlineapplicationsModel from './onlineapplications.model';

const createOnlineapplications = async (payload: IOnlineapplications) => {
  const created = await OnlineapplicationsModel.create(payload);
  return created;
};

const getSingleOnlineApplication = async (id: string) => {
  const application = await OnlineapplicationsModel.findById(id);
  return application;
}

export const onlineapplicationsService = {
  createOnlineapplications,
  getSingleOnlineApplication,
};
