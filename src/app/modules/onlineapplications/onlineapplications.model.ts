import { Schema, model, Document } from 'mongoose';
import { IOnlineapplications } from './onlineapplications.schema';
import { ONLINEAPPLICATIONS_STATUS } from './onlineapplications.constant';

export interface IOnlineapplicationsDoc extends IOnlineapplications, Document {}

const onlineapplicationsSchema = new Schema<IOnlineapplicationsDoc>(
  {
    studentNameBangla: { type: String, required: true },
    studentNameEnglish: { type: String, required: true },
    fatherNameBangla: { type: String, required: true },
    fatherNameEnglish: { type: String, required: true },
    motherNameBangla: { type: String, required: true },
    motherNameEnglish: { type: String, required: true },
    fatherAnnualIncome: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    birthPlace: { type: String, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternateWhatsAppNumber: { type: String, required: true },
    lastExamPassed: { type: String, required: true },
    passingYear: { type: String, required: true },
    board: { type: String, required: true },
    rollNumber: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    gpa: { type: String, required: true },
    desiredClass: { type: String, required: true },
    desiredGroup: { type: String, required: true },
    previousSchool: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianRelation: { type: String, required: true },
    guardianOccupation: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    guardianAddress: { type: String, required: true },
    medicalInfo: { type: String },
    specialComments: { type: String },
    declaration: { type: Boolean, required: true },
    recommendation: { type: String },
    transferCertificateNumber: { type: String, required: true },
    transferCertificateDate: { type: String, required: true },
    birthRegistrationNumber: { type: String, required: true },
    studentPhotoUrl: { type: String },
    studentSignatureUrl: { type: String },
    guardianSignatureUrl: { type: String },
    applicationStatus: {
      type: String,
      enum: Object.values(ONLINEAPPLICATIONS_STATUS),
      default: ONLINEAPPLICATIONS_STATUS.PENDING,
    },
  },
  { timestamps: true }
);

const OnlineapplicationsModel = model<IOnlineapplicationsDoc>(
  'Onlineapplications',
  onlineapplicationsSchema
);

export default OnlineapplicationsModel;
