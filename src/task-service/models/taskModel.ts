import mongoose, { Schema, InferSchemaType } from "mongoose";

const TaskSchema = new Schema({
  projectId: { type: String, required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, maxlength: 20000 },
  type: { type: String, enum: ["task", "bug", "story"], default: "task" },
  status: { type: String, enum: ["todo", "in_progress", "in_review", "done"], default: "todo", index: true },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium", index: true },
  reporterId: { type: String, required: true },
  assigneeId: { type: String },
  labels: { type: [String], default: [] },
  sprintId: { type: String },
  dueDate: { type: Date },
  estimate: { type: Number },
}, { timestamps: true });

TaskSchema.index({ projectId: 1, status: 1, priority: 1, assigneeId: 1, dueDate: 1, createdAt: -1 });

export type TaskDoc = InferSchemaType<typeof TaskSchema>;
export const TaskModel = mongoose.model("Task", TaskSchema);
