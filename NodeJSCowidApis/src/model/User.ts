import { Document, Model, model, Schema } from "mongoose";
import mongoose from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param mobile:number
 * @param password: string
 * @param members:array
 */

export interface IResult {
  [key: string]: any
}

export interface IMembers {
  photoIdProof: string,
  photoIdNumber: string
  name: string,
  gender: string,
  yearOfBirth: number,
  refId: string,
  secretCode: string,
  vaccinatedType: string,
  firstDose: object,
  secondDose: object
}

export interface IUser extends Document {
  mobile: number;
  password: string;
  members: Array<IMembers>
}

const userSchema: Schema = new Schema({
  mobile: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  members: [{
    photoIdProof: { type: String },
    photoIdNumber: { type: String },
    name: { type: String },
    gender: { type: String },
    yearOfBirth: { type: Number },
    refId: { type: String },
    secretCode: { type: String },
    vaccinatedType: { type: String },
    firstDose: { type: Object },
    secondDose: { type: Object } 
  }, { _id: false }]
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
