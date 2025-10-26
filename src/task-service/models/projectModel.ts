import mongoose, { Schema, InferSchemaType } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, maxlength: 5000 },
  ownerId: { type: String, required: true, index: true },
  members: { type: [String], default: [] },
}, { timestamps: true });

export type ProjectDoc = InferSchemaType<typeof ProjectSchema>;
export const ProjectModel = mongoose.model("Project", ProjectSchema);
