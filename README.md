# 🎓 Bulan University Social and Information System

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Bulan University Logo](public/logo/logo.png) ## Overview

# Bulan State University Social and Information System

**Note:** This platform and Bulan State University are fictional and created for educational purposes only.

## Project Description

The **Bulan State University Social and Information System** is a modern web application designed to simulate a university student portal and social platform. It features:

- A real-time forum
- A responsive student directory
- Moderation tools for managing student data and interactions
- An embedded map for viewing student locations
- Interactive analytics dashboard

This project demonstrates both frontend and backend functionalities, with a focus on user-friendly design, data protection, and communication within a school environment.

## Features

- **Student Directory** – Browse and manage student profiles  
- **Posts & Comments** – Share thoughts, academic discussions, and feedback  
- **Analytics Dashboard** – Visualize user activity with charts  
- **Map Embed** – Interactive location map of student addresses  
- **Fully Responsive UI** – Works across all device sizes

## Tech Stack

### ⚙ Framework & Languages

- [Next.js](https://nextjs.org/) (App Router with TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)

### 🖌 UI & Styling

- Tailwind CSS 4 + `tw-animate-css`
- [Framer Motion](https://www.framer.com/motion/) – Page animations
- Styled Components – Custom styling
- [ShadCN UI](https://ui.shadcn.com/) – Modern UI components
- [Lucide React](https://lucide.dev/) & [Heroicons](https://heroicons.com/) – Icons

### 📊 Charts & Visuals

- [ApexCharts](https://apexcharts.com/) – Data visualization

### 🔧 Other Tools

- [Axios](https://axios-http.com/) – API handling
- [Zustand](https://zustand-demo.pmnd.rs/) – State management
- [React Query](https://tanstack.com/query/latest) – Data fetching & caching
- [Radix UI](https://www.radix-ui.com/) – Dialogs, avatars, etc.
- [UUID](https://www.npmjs.com/package/uuid) – Unique ID generation
- [MapEmbeds.com](https://mapembeds.com/) – Embedded interactive maps


---

## Contributors

Emelson Gipa 

•	Handled the student directory page

•	Data fetching and display of student profiles

•	Compilation of all the requirements for the documentation.

Charisse Guray

•	Designed and developed the main layout of the website.

•	Implemented the responsive navigation for home, student directory and post.

•	Creates an accessible, user-friendly and simple interface

Jenny Rose Formanes

•	Implemented the post and comment system.

•	Built a posting system for students to create a post about academic suggestions and respectful post

•	Integrated comments feature under posts

Ryan Joseph De Leon

•	Integrates the ApexCharts for the total posts, comments, and users. 

•	Ensure the chart automatically updates with new data.



## Live Demo & Links

- **GitHub Repository**: https://github.com/guraycha03/uni-connect-forum

- **Live Site**: https://uni-connect-forum-rdqu.vercel.app/

- **Video Presentation**: Google Drive Folder


*Note: Bulan State University and this platform are fictional and for educational purposes only.*


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Github Repository
https://github.com/guraycha03/uni-connect-forum.git

## 🧪 Scripts

```bash
npm run dev       # Start development server (Turbopack)
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint for code checks


## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/guraycha03/uni-connect-forum.git](https://github.com/guraycha03/uni-connect-forum.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd uni-connect-forum
    ```
3.  **Install dependencies:**
    ```bash
    npm install  # or yarn install or pnpm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```
5.  Open your browser and navigate to `http://localhost:3000`.


## Deployment

To deploy this project, you can use **Vercel** or **Netlify**, both of which provide seamless integration with Next.js.

### 🚀 Vercel

1. Push your project to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
3. Click on "New Project", and select the repository you just pushed.
4. Vercel will automatically detect the Next.js framework and configure the project.
5. Click "Deploy", and after a few moments, your project will be live.

For more details, check the [Vercel documentation](https://vercel.com/docs).

### 🚀 Netlify

1. Push your project to a GitHub repository.
2. Go to [Netlify](https://www.netlify.com/) and sign in with your GitHub account.
3. Click "New site from Git", select your GitHub repository, and configure the build settings.
4. Set the build command to `next build` and the publish directory to `out` (for static export).
5. Click "Deploy Site", and your project will be live on Netlify.

For more details, check the [Netlify documentation](https://docs.netlify.com/).

---

You can also deploy to other platforms like **Heroku** or **Railway** depending on your project’s needs.

