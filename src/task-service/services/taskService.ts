import { TaskModel } from "../models/taskModel";

export async function createTask(ownerId: string, dto: any) {
  const doc = await TaskModel.create({ ...dto, ownerId });
  return doc.toJSON();
}