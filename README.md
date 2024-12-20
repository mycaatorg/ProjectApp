# ProjectApp

Framework - Next.js
Language - Typescript, Javascript

Plan:

University Admissions Assistance Tool

Phase 1: Setup and Foundation
Timeline: Week 1–2

Environment Setup (Both):

Install Node.js and TypeScript.
Set up a shared GitHub repository for version control.
Choose a CSS framework (e.g., Tailwind CSS or Material-UI).
Database Design:

Use PostgreSQL, Supabase, or Firebase for the database.
Create a schema for:
User profiles
College details
Essays
Progress tracking
Scholarships
Frontend Framework Setup:

Set up the Next.js project:
bash
Copy code
npx create-next-app@latest college-assistance-tool
npm install typescript @types/react @types/node
Integrate the chosen CSS framework.
Routing and Skeleton Pages:

Create basic routes and skeleton pages:
/: Homepage
/dashboard: User dashboard
/college-search: College matchmaking
/essay-assistance: Essay writing tool
/progress-tracker: Progress tracking
Deliverables:

GitHub repo with a Next.js project scaffold.
Basic database schema.
Phase 2: Core Web App Development
Timeline: Week 3–7

Frontend (Both):

Build pages for:
Region-Based Features: Add college search by region.
Essay Writing Assistance: Create a text editor component.
Feedback System: UI for submitting essays and receiving feedback.
Backend (Both):

Create APIs using Next.js API routes:
GET/POST for college search.
POST for essay feedback submissions.
GET for progress tracker data.
Set up user authentication with NextAuth.js or Firebase Auth.
AI Chatbot Integration:

Use OpenAI's GPT API for a chatbot.
Add a frontend chat widget.
State Management:

Use Redux or React Context to manage global state.
Deliverables:

Functional web pages for core features.
Connected backend with APIs.
Phase 3: Advanced Features
Timeline: Week 8–12

Frontend:

Progress Tracker:
Build a dashboard showing progress bars or checklists.
Scholarship Finder:
Add filters for eligibility and funding amounts.
College Matchmaking:
Implement filters for preferences (region, GPA, etc.).
Backend:

Add endpoints for:
Fetching scholarship data.
Calculating admission probability.
Storing user progress and preferences.
Admission Probability Calculator:

Use AI to predict chances based on GPA, test scores, extracurriculars.
Display results in a visual format (e.g., bar charts).
Deliverables:

Fully functional advanced features.
Admission probability calculator integrated.
Phase 4: Testing and Web App Launch
Timeline: Week 13–14

Testing:

Test frontend for responsiveness and bugs.
Test backend APIs for performance and scalability.
Deployment:

Host the web app on Vercel or Firebase Hosting.
Feedback:

Collect feedback from a test group.
Fix bugs and make improvements.
Deliverables:

Live web app.
Phase 5: Transition to Mobile App
Timeline: Week 15–20

Set Up React Native Project:

Create a React Native project:
bash
Copy code
npx react-native init CollegeAssistantMobile
Reuse Backend and Logic:

Reuse APIs created for the web app.
Share reusable logic (e.g., helper functions, API calls).
Build Mobile-Specific Features:

Create mobile-friendly UI using React Native components.
Use React Navigation for routing.
Test and Deploy Mobile App:

Test on emulators and physical devices.
Publish to the App Store and Google Play Store.
Work Distribution
Task	Person A	Person B
Initial Next.js setup	✅	✅
Region-based search	Build backend APIs	Build frontend UI
Essay writing assistance	Build AI backend	Design and integrate UI
Feedback system	Design feedback API	Create feedback UI
AI Chatbot	Integrate OpenAI API	Build chat widget UI
Progress tracker	Build backend APIs	Build frontend tracker
Deployment	Deploy on Vercel	Monitor and debug
