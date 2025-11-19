"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRightFromSquareIcon, Badge } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Prisma } from "@/app/generated/prisma";
import { deleteArticle } from "@/actions/delete-article";

type RecentArticleProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const RecentArticle: React.FC<RecentArticleProps> = ({ articles }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Recent Article</CardTitle>
            <Button>View All →</Button>
          </div>
        </CardHeader>
        {!articles.length ? (
          <CardContent>No Article found</CardContent>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>
                      <Badge className="rounded-full  bg-green-100 text-green-800">
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>{article.comments.length}</TableCell>
                    <TableCell>
                      {new Date(article.createdAt).toString().slice(0, 16)}
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link href={`/dashboard/articles/${article.id}/edit`}>
                          <Button>Edit</Button>
                        </Link>
                        <DeleteButton articleId={article.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default RecentArticle;

type Props = {
  articleId: string;
};
const DeleteButton: React.FC<Props> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={() => {
        startTransition(async () => {
          if (confirm("are you sure you want to delete!")) {
            await deleteArticle(articleId);
          }
        });
      }}
    >
      <Button disabled={isPending} variant={"ghost"} type="submit">
        {isPending ? "...Deleting" : "Delete"}
      </Button>
    </form>
  );
};
