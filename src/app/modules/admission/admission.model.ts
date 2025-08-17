import { Schema, model, Document } from 'mongoose';
import { IAdmission } from './admission.schema';

const admissionSchema = new Schema<IAdmission & Document>(
  {
    className: { type: String, required: true },
    admissionOpen: { type: Date, required: true },
    admissionClose: { type: Date, required: true },
    isAdmissionOn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AdmissionModel = model<IAdmission & Document>('Admission', admissionSchema);
export default AdmissionModel;
