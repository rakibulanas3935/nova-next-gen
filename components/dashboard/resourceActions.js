"use client";

// Thin client wrappers: server components can't hand closures to client
// components, so the id → action binding happens here.

import { EditDeleteActions, ReviewActions } from "./RowActions";
import { deleteBlog, deleteEvent, deleteLearn } from "@/lib/actions/content";
import { approveProject, rejectProject, setProjectFeatured, deleteProject, approveGallery, rejectGallery, deleteGallery, deleteMessage } from "@/lib/actions/community";
import { ConfirmButton } from "@/components/members/rows";
import { Trash2 } from "lucide-react";

export const BlogActions = ({ blog }) => (
  <EditDeleteActions editHref={`/dashboard/blog/${blog._id}`} viewHref={`/blog/${blog.slug || blog._id}`} onDelete={() => deleteBlog(blog._id)} confirm={`Delete "${blog.title}"?`} />
);

export const EventActions = ({ event }) => (
  <EditDeleteActions editHref={`/dashboard/events/${event._id}`} viewHref={`/events/${event.slug || event._id}`} onDelete={() => deleteEvent(event._id)} confirm={`Delete "${event.title}"?`} />
);

export const LearnActions = ({ lesson }) => (
  <EditDeleteActions editHref={`/dashboard/learn/${lesson._id}`} viewHref={`/learn/${lesson.slug || lesson._id}`} onDelete={() => deleteLearn(lesson._id)} confirm={`Delete "${lesson.title}"?`} />
);

export const ProjectReview = ({ project }) => (
  <ReviewActions
    approved={project.isApproved}
    featured={project.isFeatured}
    onApprove={() => approveProject(project._id)}
    onReject={() => rejectProject(project._id)}
    onFeature={(f) => setProjectFeatured(project._id, f)}
    onDelete={() => deleteProject(project._id)}
    editHref={`/members/projects/${project._id}/edit`}
    viewHref={`/projects/${project.slug || project._id}`}
  />
);

export const GalleryReview = ({ gallery }) => (
  <ReviewActions
    approved={gallery.isApproved}
    onApprove={() => approveGallery(gallery._id)}
    onReject={() => rejectGallery(gallery._id)}
    onDelete={() => deleteGallery(gallery._id)}
  />
);

export const MessageDelete = ({ id }) => (
  <ConfirmButton action={() => deleteMessage(id)} confirm="Delete this message?" variant="ghost" size="icon" title="Delete"><Trash2 className="h-4 w-4 text-red-300" /></ConfirmButton>
);
