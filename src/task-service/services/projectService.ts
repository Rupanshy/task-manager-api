import { ProjectModel } from "../models/projectModel.js";
import type { ProjectDoc } from "../models/projectModel.js";

/**
 * Create a new project.
 */
export async function createProject(data: Partial<ProjectDoc>) {
  const project = await ProjectModel.create(data);
  return project.toObject();
}

/**
 * List all projects owned by or shared with the user.
 */
export async function listProjects(userId: string, page = 1, limit = 10) {
  const filter = { $or: [{ ownerId: userId }, { members: userId }] };
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    ProjectModel.find(filter).skip(skip).limit(limit).lean(),
    ProjectModel.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

/**
 * Find a project by ID, if the user is owner or member.
 */
export async function getProjectById(projectId: string, userId: string) {
  const project = await ProjectModel.findById(projectId).lean();
  if (!project) return null;

  const isMember = project.ownerId === userId || project.members.includes(userId);
  if (!isMember) return "FORBIDDEN";

  return project;
}

/**
 * Update project if the user is owner.
 */
export async function updateProject(projectId: string, userId: string, updates: Partial<ProjectDoc>) {
  const project = await ProjectModel.findById(projectId);
  if (!project) return null;

  if (project.ownerId !== userId) return "FORBIDDEN";

  Object.assign(project, updates);
  await project.save();
  return project.toObject();
}

/**
 * Delete project if the user is owner.
 */
export async function deleteProject(projectId: string, userId: string) {
  const project = await ProjectModel.findById(projectId);
  if (!project) return null;

  if (project.ownerId !== userId) return "FORBIDDEN";

  await project.deleteOne();
  return true;
}
