import mongoose, { Schema, InferSchemaType } from "mongoose";

const SprintSchema = new Schema({
  projectId: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  goal: { type: String, maxlength: 2000 },
  status: { type: String, enum: ["planned", "active", "closed"], default: "planned", index: true },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

SprintSchema.index({ projectId: 1, status: 1, startDate: 1 });

export type SprintDoc = InferSchemaType<typeof SprintSchema>;
export const SprintModel = mongoose.model("Sprint", SprintSchema);
