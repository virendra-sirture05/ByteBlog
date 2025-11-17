import { cn } from '@/lib/utils'
import React from 'react'
import { Card } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const TopArticles = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-2xl hover:-translate-y-2",
          "border-0 shadow-lg",
          "bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        )}
      >
        <Link href={`/articles/`} className="block">
          {/* Image Container with Overlay */}
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={"https://images.unsplash.com/photo-1762545078318-8443881c2d83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"}
              alt={"Article Image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Category Badge */}
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                Technology
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                <AvatarImage src={""} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  John Doe
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Author
                </span>
              </div>
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              The Future of Web Development: What's Coming in 2025
            </h3>

            {/* Article Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              Discover the latest trends and technologies shaping the future of web development. From AI integration to new frameworks, explore what's next.
            </p>

            {/* Article Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                12 min read
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  )
}

export default TopArticles