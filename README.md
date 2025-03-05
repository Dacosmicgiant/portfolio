# ✨ Portfolio - Leaving a mark on the World ✨

Welcome to the repository for my personal portfolio website! This project is designed to be more than just a static page; it's an interactive and engaging showcase of my skills and projects in the digital realm. Built as a full-stack application, this website combines a dynamic frontend experience with a robust backend to deliver a seamless and informative user journey.

## 📂 Directory Structure

Here's a breakdown of the project's directory structure to help you navigate and understand the codebase:

<details>
  <summary>Click to expand directory structure</summary>
  '''markdown
  └── dacosmicgiant-portfolio/ 🚀 // Root project directory
  ├── 📜 README.md             // Root README file - You are here!
  ├── 📦 package.json          // Root package.json for build and start scripts
  ├── ⚙️ backend/              // Backend directory - Server-side logic
  │   ├── 📦 package.json      // Backend dependencies and scripts
  │   └── 📂 src/              // Backend source code
  │       ├── 🚀 index.js        // Backend entry point - Server initialization
  │       ├── 🎛️ controllers/    // API controllers - Handles request logic
  │       │   ├── analytics.controller.js // Analytics data handling
  │       │   ├── auth.controller.js    // Authentication and authorization
  │       │   ├── message.controller.js   // Contact form message handling
  │       │   └── project.controller.js // Project data management
  │       ├── 📚 lib/            // Libraries and utilities - Helper functions
  │       │   ├── ☁️ cloudinary.js  // Cloudinary integration - Image/video uploads
  │       │   ├── 🗄️ db.js          // Database connection - MongoDB setup
  │       │   └── 🛠️ utils.js       // Utility functions - Reusable code snippets
  │       ├── 🛡️ middleware/       // Express middlewares - Request processing
  │       │   ├── 🔑 auth.middleware.js  // Authentication middleware - Verifies user tokens
      │       │   └── 📤 multer.middleware.js // File upload middleware - Handles file uploads 1 
  │       ├── 🗂️ models/         // Mongoose models - Data schemas
  │       │   ├── 📊 analytics.model.js // Analytics data model
  │       │   ├── ✉️ message.model.js // Contact message data model
  │       │   ├── 🖼️ project.model.js // Project data model
  │       │   └── 👤 user.model.js    // User data model
  │       ├── 🛤️ routes/         // API routes - Defines API endpoints
  │       │   ├── 📊 analytics.route.js // Analytics routes
  │       │   ├── 🔑 auth.route.js    // Authentication routes
  │       │   ├── ✉️ message.route.js   // Message routes
  │       │   └── 🖼️ project.route.js // Project routes
  │       └── 🛠️ utils/          // Utility functions (duplicate - should be in lib - consider consolidating)
  │           └── ☁️ cloudinary.js // Cloudinary utility (duplicate - should be in lib - consider consolidating)
  └── 🎨 frontend/             // Frontend directory - User interface
  ├── 📜 README.md           // Frontend README file (for frontend-specific details)
  ├── ⚙️ eslint.config.js    // ESLint configuration - Code linting rules
  ├── 📄 index.html          // HTML entry point - Single page application
  ├── ⚙️ jsconfig.json       // JSConfig for VSCode - JavaScript project settings
  ├── 📦 package.json        // Frontend dependencies and scripts
  ├── 🎨 postcss.config.js   // PostCSS configuration - CSS transformations
          ├── 🎨 tailwind.config.js  // Tailwind CSS configuration - Styling framework 2 
  ├── ⚙️ vite.config.js      // Vite configuration - Build tool settings
          ├── 🙈 .gitignore          // Git ignore file - Specifies intentionally untracked files 3 
  ├── 📂 public/             // Public assets - Static files served directly
  │   └── 🖼️ icon            // Icons - Favicons and other icons
  └── 📂 src/                // Frontend source code
  ├── 🚀 App.jsx           // Main App component - Root of the React application
  ├── 🎨 index.css         // Global styles - Base CSS styles
  ├── 🎬 main.jsx          // React entry point - Initializes React app
  ├── 🖼️ assets/           // Assets - Images, fonts, etc.
  │   └── 🏞️ images/
  ├── 🧩 components/       // React components - Reusable UI elements
  │   ├── ℹ️ About.jsx
  │   ├── ➕ AddProjectModal.jsx // Modal for adding projects
  │   ├── 📊 AnalyticsDashboard.jsx // Dashboard for analytics
  │   ├── <footer> Footer.jsx       // Footer component
  │   ├── 📍 LocationPrompt.jsx // Component for location prompt
  │   ├── 导航 Navbar.jsx       // Navigation bar component
  │   ├── ℹ️ ProjectDetails.jsx // Detailed project view
  │   └── ⏱️ Timeline.jsx       // Timeline component
  ├── ⚙️ constants/        // Constants - Project-wide constants
  │   └── ⚙️ index.js
  ├── 🎣 hooks/            // React hooks - Custom hooks for logic reuse
  │   ├── 📊 useAnalytics.js // Hook for analytics data
  │   ├── 📍 useLocation.js  // Hook for location data
  │   └── 💫 useScrollAnimation.js // Hook for scroll animations
  ├── 📚 lib/              // Frontend libraries - Utility functions
  │   ├── 📊 analytics.js  // Analytics related functions
  │   └── 📡 axios.js      // Axios configuration - HTTP client setup
  ├── 📄 pages/            // React pages/views - Application routes
  │   ├── 🧑‍💼 AdminPage.jsx    // Admin dashboard page
  │   ├── 📧 ContactPage.jsx  // Contact form page
  │   ├── 🏠 HomePage.jsx     // Landing page
  │   ├── 🔐 LoginPage.jsx    // Login page
  │   ├── 🖼️ ProjectDetailPage.jsx // Detailed project page
  │   ├── 🖼️ ProjectsPage.jsx  // Projects listing page
  │   ├── ✍️ SignUpPage.jsx   // Sign up page
  │   └── 🎨 ThemePage.jsx    // Theme customization page
  └── 🗄️ store/            // Zustand store for state management - Application state
  ├── 🔑 useAuthStore.js // Authentication state management
  └── 🎨 useThemeStore.js // Theme state management
  '''
  </details>

  ## 🛠️ Technologies Used

This portfolio website leverages a range of modern technologies to ensure a dynamic user experience and robust backend functionality. Here's a breakdown of the key technologies used in each part of the application:

### 🎨 Frontend Technologies

Built to be interactive and visually engaging, the frontend utilizes these technologies:

*   **⚛️ React:**  A declarative JavaScript library for building user interfaces and interactive components.
*   **⚡ Vite:**  Next-generation frontend tooling that provides extremely fast development experience and optimized builds.
*   **✨ Tailwind CSS:**  A utility-first CSS framework for rapidly designing custom designs.
*   **🌼 DaisyUI:**  A component library on top of Tailwind CSS, providing pre-built, customizable UI components.
*   **🎬 Framer Motion:**  A powerful animation and gesture library for React, adding smooth transitions and interactions.
*   **🚀 GSAP (GreenSock Animation Platform):**  For complex, high-performance animations beyond CSS transitions.
*   **⭐ Lucide React:**  A collection of beautiful, consistent SVG icons as React components.
*   **🍞 React Hot Toast:**  For non-disruptive, elegant notification messages.
*   **🗂️ React Icons:**  Easily include icons from popular icon libraries.
*   **👁️ React Intersection Observer:**  Efficiently monitors the intersection of an element with the viewport or a parent.
*   **🗺️ React Router DOM:**  Standard library for routing in React single-page applications.
*   **📈 Recharts:**  A charting library for React, for creating interactive data visualizations.
*   **🐻 Zustand:**  A minimalist, unopinionated state management solution using stores and hooks.
*   **📜 AOS (Animate On Scroll):**  Library to trigger animations as elements scroll into view, enhancing page interactivity.

### ⚙️ Backend Technologies

The backend is engineered for performance and scalability, utilizing these technologies:

*   **<0xF0><0x9F><0x90><0xB1> Node.js:**  An asynchronous event-driven JavaScript runtime, ideal for building scalable network applications.
*   **🕸️ Express.js:**  A fast, unopinionated, minimalist web framework for Node.js, simplifying server and API creation.
*   **🌿 MongoDB:**  A flexible and scalable NoSQL database, perfect for modern web applications.
*   **🍃 Mongoose:**  An elegant MongoDB object modeling for Node.js, providing schema validation and more.
*   **🔑 JSON Web Token (JWT):** For secure authentication and authorization, ensuring API security.
*   **🔒 bcryptjs:**  For securely hashing passwords, protecting user credentials.
*   **🍪 cookie-parser:**  Middleware to parse HTTP request cookies, simplifying cookie handling.
*   **🌐 cors:**  Middleware to enable Cross-Origin Resource Sharing, allowing frontend and backend to interact smoothly.
*   **dotenv:**  Loads environment variables from a `.env` file, keeping configurations separate from code.
*   **📍 geoip-lite:**  Leverages MaxMind's GeoLite2 data to provide geolocation lookups based on IP addresses.
*   **📤 multer:**  Node.js middleware for handling `multipart/form-data`, primarily used for file uploads.
*   **📧 nodemailer:**  For sending emails from the server, used for contact forms or notifications.
*   **⚡ socket.io:** Enables real-time, bidirectional communication between web clients and servers.
*   **☁️ Cloudinary:**  A cloud-based image and video management service for storing, optimizing, and delivering media.

### ✉️ Other Utilities

*   **📧 emailjs-com:**  Allows sending emails directly from the frontend using the EmailJS service, simplifying contact form implementation.
*   **📏 eslint:** For enforcing code quality and consistency in JavaScript and JSX.
*   **💅 PostCSS & Autoprefixer:**  Tools for transforming CSS with JavaScript and automatically adding vendor prefixes for browser compatibility.

## 🛠️ Installation

Get started with setting up the portfolio website locally with these simple steps:

1.  **Clone the repository:** 🎣

    Open your terminal and use the following command to clone the project to your local machine:

    ```bash
    git clone [https://github.com/Dacosmicgiant/portfolio.git](https://github.com/Dacosmicgiant/portfolio.git)
    cd dacosmicgiant-portfolio
    ```

2.  **Install dependencies:** 📦

    At the project root, run `npm install` to install all necessary dependencies for both the frontend and backend:

    ```bash
    npm install
    ```

    This command smartly installs dependencies for both the `backend` and `frontend` directories based on the scripts defined in the root `package.json`.

3.  **Backend Configuration:** ⚙️

    *   Navigate to the `backend` directory: `cd backend`
    *   Create a `.env` file in the `backend` directory to store your environment variables securely.
    *   Populate `.env` with the following essential configurations. **Remember to replace the placeholders with your actual credentials!**

        ```
        PORT=5000                      # Server port
        MONGODB_URI=your_mongodb_connection_string  # MongoDB connection URI
        JWT_SECRET=your_jwt_secret_key    # Secret key for JWT signing
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name # Cloudinary account details
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        EMAIL_USER=your_emailjs_user_id      # EmailJS service credentials for contact form
        EMAIL_SERVICE_ID=your_emailjs_service_id
        EMAIL_TEMPLATE_ID=your_emailjs_template_id
        ```

4.  **Frontend Configuration:** 🎨

    *   Navigate to the `frontend` directory: `cd ../frontend`
    *   Frontend environment variables are typically managed by Vite.  For backend URLs or API keys needed in the frontend, refer to Vite's documentation on how to securely manage environment variables for your frontend application, considering your deployment strategy. You might use `.env` files in the frontend or configure variables directly in `vite.config.js` if suitable for your setup.

## 🚀 Usage

Once you've completed the installation, here’s how to run the portfolio website:

1.  **Start the development server:** ⚙️

    From the project root directory, run:

    ```bash
    npm run start
    ```

    This command will concurrently start both the frontend Vite development server and the backend Node.js server, providing a hot-reloading development environment.  Typically:

    *   Frontend: Accessible at `http://localhost:5173` (or another port if 5173 is in use).
    *   Backend: Accessible at `http://localhost:5000` (or the port you set in your `.env` file).

2.  **Build for production:** 📦

    To create optimized production builds of the frontend and backend, execute:

    ```bash
    npm run build
    ```

    This command will:

    *   Build the frontend application: Optimized assets will be generated in the `frontend/dist` directory.
    *   Prepare the backend for deployment:  Ensuring backend is ready to serve the built frontend and handle production traffic.

    After building, you can deploy the contents of the `frontend/dist` folder to any static file hosting service, and deploy the backend to a Node.js hosting environment.

## 🎉 Contributing

We welcome contributions to enhance and improve this portfolio website! If you're interested in contributing, please follow these guidelines:

1.  **Fork the repository:** 🍴

    Start by forking the project repository to your own GitHub account. This creates a personal copy of the project where you can make changes.

2.  **Create a new branch:** 🌿

    For each feature or bug fix, create a new branch with a descriptive name:

    ```bash
    git checkout -b feature/your-new-feature
    ```

    or

    ```bash
    git checkout -b bugfix/fix-that- Pesky-bug
    ```

3.  **Make your changes:** ✍️

    Implement your changes, adhering to the project's coding style and guidelines. Ensure your code is well-commented and tested.

4.  **Commit your changes:** 💾

    Commit your changes with clear, concise commit messages that explain the *what* and *why* of your changes:

    ```bash
    git commit -m "feat: Add amazing new feature"
    ```

    or

    ```bash
    git commit -m "fix: Resolve issue with project details page"
    ```

5.  **Push your changes to your fork:** 📤

    Push your branch to your forked repository on GitHub:

    ```bash
    git push origin feature/your-new-feature
    ```

6.  **Submit a pull request:** 🚀

    Create a pull request from your branch to the main project repository. In your pull request, provide a clear title and description of your changes, and reference any related issues.

## 📜 License

This project is licensed under the [ISC License](LICENSE).
