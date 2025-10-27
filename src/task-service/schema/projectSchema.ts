
import { z } from "zod";

export const projectSchemas = {
  create: z.object({
    key: z.string().min(1).max(10).regex(/^[A-Z0-9]+$/, "Must be uppercase alphanumeric"),
    name: z.string().min(1).max(120),
    description: z.string().max(5000).optional(),
    members: z.array(z.string()).max(20).optional(),
  }),

  update: z.object({
    key: z.string().min(1).max(10).regex(/^[A-Z0-9]+$/, "Must be uppercase alphanumeric").optional(),
    name: z.string().min(1).max(120).optional(),
    description: z.string().max(5000).optional(),
    members: z.array(z.string()).max(20).optional(),
  }),

  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  }),
};


