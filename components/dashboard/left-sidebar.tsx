"use client"
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { BarChart, FileText, LayoutDashboard, MessageCircle, Settings } from "lucide-react";
import Link from "next/link";

const LeftSidebar = () => {
    const [isOpen, setIsopen] = useState(false);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsopen} >
        <SheetTrigger asChild>
          <Button className="md:hidden">
            <LayoutDashboard className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background ">
        <DashboardSidebar/>
      </div>
    </div>
  );
};

export default LeftSidebar;

const DashboardSidebar = () => {
  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-4">
        <Link href={"/"}>
          <span className="text-xl font-bold">ByteBlog</span>
        </Link>
      </div>
      <nav>
        <Link href={"/dashboard"}>
          <Button variant={'ghost'} className="w-full justify-start">
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Overview
          </Button>
        </Link>
        <Link href={"/dashboard/articles/create"}>
          <Button variant={'ghost'} className="w-full justify-start">
            <FileText className="w-5 h-5 mr-2" />
            Articles
          </Button>
        </Link>
        {/* <Link href={"/dashboard"}>
          <Button variant={'ghost'} className="w-full justify-start">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant={'ghost'} className="w-full justify-start">
            <BarChart className="w-5 h-5 mr-2" />
            Analytics
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant={'ghost'} className="w-full justify-start">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </Link> */}
      </nav>
    </div>
  );
};
