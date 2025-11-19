"use client"
import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { createComment } from "@/actions/create-comment";
import { Span } from "next/dist/trace";

type CommentInputProps = {
    articleId : string
}
const CommentInput : React.FC<CommentInputProps> = ({articleId}) => {
    const [formstate, action, isPending] = useActionState(createComment.bind(null, articleId), {errors:{}});

  return (
    <form action={action}>
      <div className="flex gap-4 items-center mt-10">
        <div className="flex items-center gap-4 text-muted-foreground">
          <Avatar className="h-10 w-10">
            <AvatarImage src={""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Input
            type="text"
            name="body"
            placeholder="Add a comment"
            className="w-[100%]"
          />
          {formstate.errors.body && <span className="text-red-600">{formstate.errors.body}</span>}
        </div>
      </div>
      {formstate.errors.formErrors && <span>{formstate.errors.formErrors[0]}</span>}

      <div className="text-end">
        <Button type="submit" disabled={isPending} >{isPending ? "...Loading": "Post comment"}</Button>
      </div>
    </form>
  );
};

export default CommentInput;
