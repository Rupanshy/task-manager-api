import { Schema } from "mongoose";
import { taskConnection } from "../db/mongoose.js";

export type TaskDoc = {
  title: string;
  description?: string;
  type: "feature" | "bug" | "chore" | "improvement";
  priority: "low" | "medium" | "high" | "critical";
  status: "backlog" | "in_progress" | "code_review" | "done";
  repoLink?: string;
  branch?: string;
  issueRef?: string;
  effortHours?: number;
  labels?: string[];
  dueDate?: Date;
  sprintId?: string | null;
  ownerId: string;
  assignees: string[];
  createdAt: Date;
  updatedAt: Date;
};

const TaskSchema = new Schema<TaskDoc>(
  {
    title: { type: String, required: true, trim: true, minlength: 4, maxlength: 120 },
    description: { type: String, default: "" },
    type: { type: String, enum: ["feature", "bug", "chore", "improvement"], required: true, default: "feature" },
    priority: { type: String, enum: ["low", "medium", "high", "critical"], required: true, default: "medium" },
    status: { type: String, enum: ["backlog", "in_progress", "code_review", "done"], required: true, default: "backlog" },
    repoLink: String,
    branch: String,
    issueRef: String,
    effortHours: { type: Number, min: 0, max: 100 },
    labels: { type: [String], default: [] },
    dueDate: Date,
    sprintId: { type: String, default: null },
    ownerId: { type: String, required: true },
    assignees: { type: [String], default: [] }
  },
  { timestamps: true }
);

// helpful indexes
TaskSchema.index({ ownerId: 1, status: 1, updatedAt: -1 });
TaskSchema.index({ assignees: 1, status: 1 });

TaskSchema.set("toJSON", {
  transform(_doc, ret) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
  }
});

export function TaskModel() {
  return taskConnection().model<TaskDoc>("Task", TaskSchema);
}
