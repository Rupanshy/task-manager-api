import { TaskModel } from "../models/taskModel";

export async function createTask(ownerId: string, dto: any) {
  const doc = await TaskModel.create({ ...dto, ownerId });
  return doc.toJSON();
}

// src/task-service/services/taskService.ts
export async function listTasks(ownerId: string, q: {
  page: number; limit: number; projectId?: string; status?: string;
  assigneeId?: string; dueFrom?: Date; dueTo?: Date; sort?: string;
}) {
  const { page, limit, projectId, status, assigneeId, dueFrom, dueTo, sort } = q;
  const skip = (page - 1) * limit;

  const filter: any = { ownerId };
  if (projectId) filter.projectId = projectId;
  if (status) filter.status = status;
  if (assigneeId) filter.assigneeId = assigneeId;
  if (dueFrom || dueTo) {
    filter.dueDate = {
      ...(dueFrom ? { $gte: dueFrom } : {}),
      ...(dueTo ? { $lte: dueTo } : {}),
    };
  }

  const [rows, total] = await Promise.all([
    TaskModel.find(filter)
      .sort(sort || "-createdAt")
      .skip(skip)
      .limit(limit)
      .lean(),
    TaskModel.countDocuments(filter),
  ]);

  // 👇 Normalize _id → id, drop __v
  const data = rows.map((r: any) => {
    const { _id, __v, ...rest } = r;
    return { id: String(_id), ...rest };
  });

  return { page, limit, total, data };
}
