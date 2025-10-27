// src/task-service/models/Task.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const TaskSchema = new Schema(
  {
    projectId: { type: String, required: true, index: true },
    title:     { type: String, required: true, trim: true, maxlength: 160 },
    description:{ type: String, trim: true, default: "" },
    status:    { type: String, enum: ["TODO","IN_PROGRESS","DONE"], default: "TODO", index: true },
    priority:  { type: String, enum: ["LOW","MEDIUM","HIGH"], default: "MEDIUM" },
    assigneeId:{ type: String, default: null, index: true },
    dueDate:   { type: Date, default: null, index: true },
    ownerId:   { type: String, required: true, index: true }, // from JWT
  },
  { timestamps: true }
);

// nicer API
TaskSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export type Task = InferSchemaType<typeof TaskSchema>;
export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
