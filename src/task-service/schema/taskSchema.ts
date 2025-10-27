// src/task-service/schemas/task.ts
import { z } from "zod";

const Status = z.enum(["TODO","IN_PROGRESS","DONE"]);
const Priority = z.enum(["LOW","MEDIUM","HIGH"]);

export const taskSchemas = {
  create: z.object({
    projectId: z.string().min(1),
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().max(5000).optional().default(""),
    status: Status.optional().default("TODO"),
    priority: Priority.optional().default("MEDIUM"),
    assigneeId: z.string().trim().optional().nullable(),
    dueDate: z.coerce.date().optional().nullable(), // accepts ISO string
  }),

  update: z.object({
    title: z.string().trim().min(1).max(160).optional(),
    description: z.string().trim().max(5000).optional(),
    status: Status.optional(),
    priority: Priority.optional(),
    assigneeId: z.string().trim().optional().nullable(),
    dueDate: z.coerce.date().optional().nullable(),
  }),

  // filters: pagination + common filters
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    projectId: z.string().optional(),
    status: Status.optional(),
    assigneeId: z.string().optional(),
    dueFrom: z.coerce.date().optional(),
    dueTo: z.coerce.date().optional(),
    sort: z.string().optional().default("-createdAt"), // eg: "-dueDate", "priority"
  }),
};
