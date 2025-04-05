# CAAT

## What is CAAT?

CAAT (College Admissions Assistance Tool) is a full-stack web application designed to support students in their journey toward college admissions and even after they have chosen their paths. It will provide a unified platform to help users organize, manage, and enhance their application materials. CAAT focuses on personalized tools that streamline tasks like building resumes, managing profiles, exploring colleges, and tracking application progress. CAAT will involve the use of Chat ai to recommend, assist and provide feedback on the users' work.

## How our code is built up

## Frontend:

## app/

    This is the core of the Next.js App Router structure.

    app/layout.tsx: Root layout shared across all pages. It wraps the app in shared components (like navigation) and global styles.

    app/globals.css: Global styles including Tailwind utilities, CSS variables for themes, and font imports.

    app/auth/: Handles user authentication views such as login and signup.

    app/dashboard/: Contains subpages like resume, colleges, and profile available after login.

### components/

Houses reusable UI components.

### extensions/

Custom TipTap/other extensions are defined here:

### .env.local

Used to store environment variables aa