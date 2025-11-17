import React from "react";
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

const RecentArticle = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Recent Article</CardTitle>
            <Button>View All →</Button>
          </div>
        </CardHeader>
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
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>
                  <Badge className="rounded-full  bg-green-100 text-green-800">
                    Published
                  </Badge>
                </TableCell>
                <TableCell>2</TableCell>
                <TableCell>12 feb</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link href={`/dashbaord/article/${123}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                    <DeleteButton/>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentArticle;

const DeleteButton = () =>{
    return (
        <form action="">
            <Button variant={'ghost'} type="submit">Delete</Button>
        </form>
    )
}
