import React from "react";
import { Button } from "../ui/button";
import { FileText, MessageCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticle from "./recent-article";

const BlogDashboard = () => {
  return (
    <div>
      <div className="flex justify-between px-8 py-8">
        <div>
          <div>Blog Dashboard</div>
          <p>Mange your content and analytics</p>
        </div>
        <div>
          <Link href={"/dashboard/articles/create"}>
            <Button>
              <Plus />
              New Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick state  */}
      <div className="grid md:grid-cols-3 mb-8 gap-4">
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Total Articles</CardTitle>
                <FileText className="w-4 h-4"/>
            </CardHeader>
            <CardContent>
                <h2>2</h2>
                <div>+5 from last month</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Total Comments</CardTitle>
                <MessageCircle className="w-4 h-4"/>
            </CardHeader>
            <CardContent>
                <h2>3</h2>
                <div>12 awaiting moderation</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Avg. Rating Time</CardTitle>
                <FileText className="w-4 h-4"/>
            </CardHeader>
            <CardContent>
                <h2>4.2</h2>
                <div>0.6+ from last month</div>
            </CardContent>
        </Card>
      </div>

      <RecentArticle/>
    </div>
  );
};

export default BlogDashboard;
