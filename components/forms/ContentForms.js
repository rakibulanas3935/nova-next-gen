"use client";

import Button from "@/components/ui/Button";
import { Field, Input, Select, Checkbox } from "@/components/ui/form";
import RichEditor from "@/components/editor/RichEditor";
import ImageField from "./ImageField";
import { useActionForm } from "./useActionForm";
import { toLocalInput, EVENT_TYPES } from "@/lib/format";
import { createBlog, updateBlog, createEvent, updateEvent, createLearn, updateLearn } from "@/lib/actions/content";
import { submitProject, updateProject } from "@/lib/actions/community";

const Actions = ({ loading, label, cancelHref }) => (
  <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
    <Button type="submit" loading={loading}>{label}</Button>
    {cancelHref && <Button href={cancelHref} variant="ghost">Cancel</Button>}
  </div>
);

// ---------------------------------------------------------------------------
export function BlogForm({ blog, backHref = "/dashboard/blog" }) {
  const action = blog ? (fd) => updateBlog(blog._id, fd) : createBlog;
  const { onSubmit, loading } = useActionForm(action, { redirectTo: backHref });
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Title" htmlFor="title" required>
        <Input id="title" name="title" defaultValue={blog?.title} required maxLength={160} placeholder="A night with the Orion Nebula" />
      </Field>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Field label="Content" required>
            <RichEditor initialHtml={blog?.description || ""} />
          </Field>
        </div>
        <div className="space-y-6">
          <ImageField mode="url" name="blogImage" initialUrl={blog?.blogImage || ""} />
          <Field label="Publish date" htmlFor="dateTime">
            <Input id="dateTime" name="dateTime" type="datetime-local" defaultValue={toLocalInput(blog?.dateTime || new Date())} />
          </Field>
          <Field label="Tags" htmlFor="tags" hint="Comma separated, e.g. moon, astrophotography">
            <Input id="tags" name="tags" defaultValue={blog?.tags?.join(", ")} placeholder="moon, beginners" />
          </Field>
          <input type="hidden" name="isPublished" value="false" />
          <Checkbox name="isPublished" value="true" defaultChecked={blog ? blog.isPublished !== false : true} label="Published (visible on the site)" />
        </div>
      </div>
      <Actions loading={loading} label={blog ? "Save changes" : "Publish post"} cancelHref={backHref} />
    </form>
  );
}

// ---------------------------------------------------------------------------
export function EventForm({ event, backHref = "/dashboard/events" }) {
  const action = event ? (fd) => updateEvent(event._id, fd) : createEvent;
  const { onSubmit, loading } = useActionForm(action, { redirectTo: backHref });
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Title" htmlFor="title" required>
        <Input id="title" name="title" defaultValue={event?.title} required maxLength={160} placeholder="Perseids watch party" />
      </Field>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Field label="Description" required>
          <RichEditor initialHtml={event?.description || ""} placeholder="What, where, what to bring…" />
        </Field>
        <div className="space-y-5">
          <ImageField label="Poster" fileName="posterFile" initialUrl={event?.poster || ""} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Field label="Starts" htmlFor="eventTime" required>
              <Input id="eventTime" name="eventTime" type="datetime-local" defaultValue={toLocalInput(event?.eventTime)} required />
            </Field>
            <Field label="Ends" htmlFor="endTime">
              <Input id="endTime" name="endTime" type="datetime-local" defaultValue={toLocalInput(event?.endTime)} />
            </Field>
          </div>
          <Field label="Type" htmlFor="type">
            <Select id="type" name="type" defaultValue={event?.type || "other"}>
              {Object.entries(EVENT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
            </Select>
          </Field>
          <Field label="Location" htmlFor="location" hint="Leave empty for online-only.">
            <Input id="location" name="location" defaultValue={event?.location} placeholder="School observatory, Building C rooftop" />
          </Field>
          <Field label="Meeting link" htmlFor="meetLink">
            <Input id="meetLink" name="meetLink" type="url" defaultValue={event?.meetLink} placeholder="https://meet.google.com/…" />
          </Field>
          <input type="hidden" name="membersOnly" value="false" />
          <Checkbox name="membersOnly" value="true" defaultChecked={!!event?.membersOnly} label="Members only (hide the link from visitors)" />
        </div>
      </div>
      <Actions loading={loading} label={event ? "Save changes" : "Create event"} cancelHref={backHref} />
    </form>
  );
}

// ---------------------------------------------------------------------------
export function ProjectForm({ project, isAdmin = false, backHref = "/members" }) {
  const action = project ? (fd) => updateProject(project._id, fd) : submitProject;
  const { onSubmit, loading } = useActionForm(action, { redirectTo: backHref });
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Project title" htmlFor="title" required>
        <Input id="title" name="title" defaultValue={project?.title} required maxLength={160} placeholder="Exoplanet transit classifier" />
      </Field>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Field label="Description" required hint="What it does, how you built it, what you learned.">
          <RichEditor initialHtml={project?.description || ""} placeholder="Tell the story of the project…" />
        </Field>
        <div className="space-y-5">
          <ImageField label="Cover image" fileName="imageFile" initialUrl={project?.projectImage || ""} />
          <Field label="Live link" htmlFor="liveLink">
            <Input id="liveLink" name="liveLink" type="url" defaultValue={project?.liveLink} placeholder="https://…" />
          </Field>
          <Field label="Source code" htmlFor="repoLink">
            <Input id="repoLink" name="repoLink" type="url" defaultValue={project?.repoLink} placeholder="https://github.com/…" />
          </Field>
          <Field label="Tags" htmlFor="tags" hint="Comma separated">
            <Input id="tags" name="tags" defaultValue={project?.tags?.join(", ")} placeholder="python, machine-learning" />
          </Field>
          {isAdmin && (
            <>
              <input type="hidden" name="isFeatured" value="false" />
              <Checkbox name="isFeatured" value="true" defaultChecked={!!project?.isFeatured} label="Featured on the home page" />
            </>
          )}
        </div>
      </div>
      {!isAdmin && <p className="text-xs text-fg-subtle">Submissions are reviewed by an admin before they appear publicly.</p>}
      <Actions loading={loading} label={project ? "Save changes" : isAdmin ? "Publish project" : "Submit for review"} cancelHref={backHref} />
    </form>
  );
}

// ---------------------------------------------------------------------------
export function LearnForm({ lesson, backHref = "/dashboard/learn" }) {
  const action = lesson ? (fd) => updateLearn(lesson._id, fd) : createLearn;
  const { onSubmit, loading } = useActionForm(action, { redirectTo: backHref });
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Title" htmlFor="title" required>
        <Input id="title" name="title" defaultValue={lesson?.title} required maxLength={160} />
      </Field>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Field label="Lesson" required>
          <RichEditor initialHtml={lesson?.description || ""} />
        </Field>
        <div className="space-y-5">
          <Field label="Level" htmlFor="level">
            <Select id="level" name="level" defaultValue={lesson?.level || "beginner"}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>
          </Field>
          <Field label="Category" htmlFor="category">
            <Input id="category" name="category" defaultValue={lesson?.category || ""} placeholder="Observing, Astrophotography, Data…" />
          </Field>
          <Field label="Order" htmlFor="order" hint="Lower numbers appear first.">
            <Input id="order" name="order" type="number" defaultValue={lesson?.order ?? 0} />
          </Field>
        </div>
      </div>
      <Actions loading={loading} label={lesson ? "Save changes" : "Publish lesson"} cancelHref={backHref} />
    </form>
  );
}
