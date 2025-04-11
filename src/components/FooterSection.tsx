import Link from 'next/link'
import React from 'react'

export default function FooterSection() {
  return (
    <footer className="w-full border-t bg-white dark:bg-background">
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <span className="text-xl font-bold">FireflyOS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A college project by computer science students exploring
            operating system development with Rust.
          </p>
        </div>
        <div className="flex flex-col items-end justify-end space-y-4">
          <div className="flex space-x-4">
            <Link
              href="https://github.com/akash1047/firefly"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Firefly OS Project Team. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
  )
}
