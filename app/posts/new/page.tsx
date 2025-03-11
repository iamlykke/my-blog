"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from "react-markdown";

const postSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  tags: z.array(z.string()).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const content = watch("content");

  const onSubmit = (data: PostFormData) => {
    console.log("Post submitted:", data);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto py-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className={`input w-full ${errors.title ? "input-error" : ""}`}
            placeholder="Type here"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 fieldset-label">
              {errors.title.message}
            </p>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <input
            id="description"
            type="text"
            className={`input w-full ${
              errors.description ? "input-error" : ""
            }`}
            placeholder="Type here"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 fieldset-label">
              {errors.description.message}
            </p>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Article</legend>
          <textarea
            id="content"
            className="textarea w-full color-base-100"
            placeholder="Write your article here"
            {...register("content")}
          />
        </fieldset>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (comma-separated)
          </label>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <input
                type="text"
                placeholder="e.g., sport, books, travel"
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((tag) => tag.trim()),
                  )
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
        </div>
        <button className="btn btn-primary w-full">Create Post</button>
      </form>

      <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Preview</h3>
        <ReactMarkdown>{content || "Nothing to preview."}</ReactMarkdown>
      </div>
    </div>
  );
}
