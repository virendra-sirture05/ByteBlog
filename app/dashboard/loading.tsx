import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
          
          {/* Spinning ring */}
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
          
          {/* Inner pulse */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Loading
          </h2>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Please wait while we prepare your content
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;