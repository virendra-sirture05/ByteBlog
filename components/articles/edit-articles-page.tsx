"use client"
import React, { FormEvent, startTransition, useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createArticle } from "@/actions/create-article";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Articles } from "@/app/generated/prisma";
import { editArticles } from "@/actions/edit-article";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});


type EditPropPage = {
    article : Articles
}

const EditArticlesPage : React.FC<EditPropPage> = ({article}) => {
  const [content, setContent] = useState("");
//   const [formstate, action, isPending] = useActionState(createArticle, {
//     error : {}
//   });
  const [formstate, action, isPending] = useActionState(
    editArticles.bind(null, article.id),
    { errors: {} }
  );

  const handleSubmit = async(event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("content", content);
    
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-8 pr-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          {formstate.errors.formErrors && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {formstate.errors.formErrors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" defaultValue={article.title} placeholder="Enter article title" />
              {formstate.errors.title && (
                <span className="text-red-500 text-sm">{formstate.error.title[0]}</span>
              )}
            </div>

            <div className="flex flex-col my-6 gap-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                name="category" 
                defaultValue={article.category}
                suppressHydrationWarning
                className="border text-white rounded px-3 py-2"
              >
                <option value="">Select Category</option>
                <option className="text-black" value="programming">Programming</option>
                <option className="text-black" value="technology">Technology</option>
                <option  className="text-black" value="web-development">Web Development</option>
              </select>
              {formstate.errors.category && (
                <span className="text-red-500 text-sm">{formstate.errors.category[0]}</span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input 
                type="file" 
                id="featuredImage" 
                name="featuredImage" 
                accept="image/*"
              />
              {formstate.errors.featuredImage && (
                <span className="text-red-500 text-sm">{formstate.errors.featuredImage[0]}</span>
              )}
            </div>
            <div>
               {article.featuredImage && <img src={article.featuredImage} alt="featured image" /> } 
            </div>

            <div className="my-6">
              <Label>Content</Label>
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                className=""
              />
              {formstate.errors.content && (
                <span className="text-red-500 text-sm">{formstate.errors.content[0]}</span>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="ghost">Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Publishing..." : "Edit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlesPage;