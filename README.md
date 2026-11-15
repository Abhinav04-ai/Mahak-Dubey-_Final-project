# FocusFlow — Task Manager

FocusFlow is a beginner-friendly task manager built with React and Vite. It lets each local demo account organize tasks by title, due date, and priority, and track progress from a responsive dashboard.

> **Demo authentication only:** Accounts and tasks are stored in the browser's `localStorage`. Passwords are not hashed, and there is no server-side authentication or database. Do not use real or sensitive credentials. A production app needs a secure backend and a suitable authentication provider.

## Features

- Sign up, sign in, and sign out
- Create, edit, complete, and delete tasks
- Search task titles and descriptions
- Filter by completion status and priority
- Light and dark themes, saved in the browser
- Form validation, loading states, and visible error messages
- Responsive dashboard and authentication pages
- Browser persistence using `localStorage`

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS 4
- React Context API
- Browser `localStorage`

## Project structure

```text
public/
  _redirects             # Netlify single-page-app route fallback
src/
  assets/
  components/            # Shared layout, form, and task components
  context/                # Authentication, tasks, and theme state
  hooks/                  # Reusable localStorage hook
  pages/                  # Login, signup, dashboard, and 404 pages
  utils/                  # Validation, storage, and task helpers
  App.jsx                 # Routes
  index.css               # Tailwind import and shared styles
  main.jsx                # Application entry point and providers
index.html
vite.config.js
package.json
```

## Run locally

Install [Node.js](https://nodejs.org/) first. To create a fresh Vite React project from scratch:

```powershell
npm create vite@latest focusflow -- --template react
cd focusflow
npm install
npm install react-router-dom
npm install tailwindcss @tailwindcss/vite
```

Copy this project's source and configuration files into the new project, replacing the generated files where names overlap. Then start the development server:

```powershell
npm run dev
```

On Windows PowerShell, if script execution blocks `npm`, use the Windows command shim instead:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

To create and preview a production build:

```powershell
npm run build
npm run preview
```

## Using the app

1. Open the app and choose **Create an account**.
2. Register with a name, email, and password of at least eight characters.
3. Add a task, set its due date and priority, then save it.
4. Use the search box and dropdowns to find tasks.
5. Toggle a task's completion, edit it, or delete it.
6. Use the theme button in the header to switch light/dark mode.

Data is saved in the current browser profile. Clearing site data removes the demo account and tasks. A different browser or device will not share them.

## Deploy to Vercel

1. Push the project to a Git provider such as GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Select **Vite** as the framework preset if it is not detected automatically.
4. Set the build command to `npm run build` and the output directory to `dist`.
5. Choose **Deploy**. Vercel will also build and deploy subsequent pushes.

## Deploy to Netlify

1. Push the project to a Git provider such as GitHub.
2. In [Netlify](https://www.netlify.com/), choose **Add new site** and import the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Choose **Deploy site**. The included `public/_redirects` file is copied into the build and routes app paths to `index.html`.

You can also deploy the `dist` folder after running `npm run build`, using the hosting provider's manual deploy option.

## Likely viva questions

**1. What is React?**  
React is a JavaScript library for building user interfaces from reusable components.

**2. What is Vite used for?**  
Vite runs the local development server and bundles the app for production.

**3. Why is the application divided into components?**  
Components separate the interface into smaller reusable parts, making code easier to maintain and explain.

**4. What is React Context used for in this project?**  
Context shares authentication, tasks, and theme state across components without passing props through every level.

**5. What does React Router do?**  
It maps URLs to pages and protects the dashboard route from signed-out visitors.

**6. How are tasks saved?**  
Task data is serialized as JSON and saved in `localStorage`, scoped to the current demo user's ID.

**7. What is a limitation of `localStorage`?**  
It is tied to one browser profile, has limited capacity, can be edited by the user, and does not provide secure authentication or cross-device syncing.

**8. How does form validation work?**  
The forms check input values before submission and show field-specific error messages when values are invalid.

**9. How do search and filters work together?**  
The dashboard combines the selected status and priority filters with a case-insensitive search over task titles and descriptions.

**10. How is dark mode remembered?**  
The selected theme is saved in `localStorage` and applied as a document theme attribute.

**11. What happens when a user completes a task?**  
The task's `completed` property changes, the saved task list updates, and dashboard progress is recalculated.

**12. Is this authentication suitable for a real production app?**  
No. This is a front-end demonstration. Production authentication requires a secure server or trusted provider; passwords must never be stored as plain text in browser storage.

**13. What does a production build do?**  
It compiles and optimizes the application into static files that can be served by a hosting provider.

**14. Why is a route fallback needed on Netlify?**  
The app uses client-side routing. The fallback sends direct route requests to `index.html`, allowing React Router to render the correct page.
