import mongoose, { Schema, InferSchemaType } from "mongoose";

const CommentSchema = new Schema({
  taskId: { type: String, required: true, index: true },
  authorId: { type: String, required: true },
  body: { type: String, required: true, maxlength: 10000 },
}, { timestamps: true });

CommentSchema.index({ taskId: 1, createdAt: -1 });

export type CommentDoc = InferSchemaType<typeof CommentSchema>;
export const CommentModel = mongoose.model("Comment", CommentSchema);
