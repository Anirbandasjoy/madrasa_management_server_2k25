import { IAdmission } from './admission.schema';
import AdmissionModel from './admission.model';

const createAdmission = async (payload: IAdmission) => {
  const created = await AdmissionModel.create(payload);
  return created;
};

const getAdmission = async (id: string, selectedField?: string | null) => {
  const admission = selectedField
    ? await AdmissionModel.findById(id).select(selectedField)
    : await AdmissionModel.findById(id);
  return admission;
};

const deleteAdmission = async (id: string) => {
  await AdmissionModel.findByIdAndDelete(id);
};

const updateAdmission = async (
  id: string,
  payload: Partial<IAdmission>,
  selectedField?: string | null
) => {
  const updated = selectedField
    ? await AdmissionModel.findByIdAndUpdate(id, payload, { new: true }).select(selectedField)
    : await AdmissionModel.findByIdAndUpdate(id, payload, { new: true });
  return updated;
};

export const admissionService = {
  createAdmission,
  getAdmission,
  deleteAdmission,
  updateAdmission,
};
