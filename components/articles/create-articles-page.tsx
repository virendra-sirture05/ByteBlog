"use client"
import React, { FormEvent, startTransition, useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css';
import { Button } from "../ui/button";
import { createArticle } from "@/actions/create-article";


const CreateArticlesPage = () => {
  const [content, setContent]  = useState("");
  const [formstate, action, isPending] = useActionState(createArticle,{
    error : {}
  });

  const handleSubmit = async(event : FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("content", content)
    startTransition(()=>{
      action(formData)
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-8 pr-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <Input type="text" name="title" placeholder="Create a article" />
              {formstate.error.title && <span className="text-red-500">{formstate.error.title}</span> }
            </div>
            <div className="flex  flex-col my-6 gap-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" name="category">
                <option value={''}>Select Category</option>
                <option value={"programming"}>Programming</option>
                <option value={"technology"}>Technology</option>
                <option value={"web-development"}>Web Development</option>
              </select>
              {formstate.error.category && <span className="text-red-500">{formstate.error.category}</span> }
            </div>
            <div>
              <label htmlFor="featuredImage">Featured Image</label>
              <Input type="file" id="featuredImage" name="featuredImage" accept="image/*"/>
            </div>
            <div className="my-6">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent}/>
              {formstate.error.content && <span className="text-red-500">{formstate.error.content}</span> }
            </div>
            <div className="flex gap-4 justify-end">
              <Button variant={'ghost'}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {
                  isPending ? "...Loading" : "Published"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;
