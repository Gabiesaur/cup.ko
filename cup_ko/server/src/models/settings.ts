import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  adminPasswordHash: string;
}

const SettingsSchema: Schema = new Schema({
  adminPasswordHash: { type: String, required: true },
});

export default mongoose.model<ISettings>("Settings", SettingsSchema);
