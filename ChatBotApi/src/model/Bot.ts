import { Document, Model, model, Schema } from "mongoose";
import mongoose from "mongoose";

/**
 * Interface to model the Bot Schema for TypeScript.
 * @param botQuestions:Array
 */

export interface IBot extends Document {
  botQuestions: Array<object>
}

const botSchema: Schema = new Schema({
  botQuestions: { type: [Object] }
});

const Bot = mongoose.model<IBot>("Bot", botSchema);

export default Bot;