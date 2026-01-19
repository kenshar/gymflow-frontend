# GymFlow Frontend

GymFlow Frontend is a modern web application designed to streamline gym management for both members and administrators. Built with React, Vite, and Tailwind CSS, it offers a fast, responsive, and user-friendly experience.

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Folder Overview](#folder-overview)
- [Contributing](#contributing)
- [License](#license)

---


## Features

GymFlow Frontend is designed to provide a seamless experience for both gym members and administrators:

- **Secure Member Login & Personalized Profiles:** Members can register, log in, and manage their personal profiles, ensuring their information is always up to date and secure.
- **Comprehensive Admin Dashboard:** Administrators have access to a powerful dashboard where they can manage member records, monitor check-ins, and view key analytics to keep the gym running smoothly.
- **Effortless Check-In System:** Members can easily check in and out, allowing the gym to track attendance and activity trends for better resource planning.
- **Workout Logging & History:** Members can log their workouts, track progress over time, and review their workout history, promoting motivation and accountability.
- **Responsive & Modern UI:** The application is built with a mobile-first approach using Tailwind CSS, ensuring a fast and intuitive experience on any device.
- **Rich Media Integration:** Embedded videos provide workout demonstrations and gym tours, enhancing the user experience and supporting member engagement.
- **Service & Event Information:** The app showcases available gym services and highlights upcoming events, keeping members informed and involved.
- **Intuitive Navigation:** Features like breadcrumb navigation and reusable UI components make it easy for users to find what they need and for developers to maintain and extend the app.

---

eslint.config.js
index.html
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
public/
  videos/
src/
  App.css
  App.jsx
  index.css
  main.jsx
  assets/
  components/
    About.jsx
    AdminDashboard.jsx
    BreadcrumbNavigation.jsx
    Footer.jsx
    Header.jsx
    Hero.jsx
    Login.jsx
    MemberFormModal.jsx
    Services.jsx
    Upcoming.jsx
    admin/
      AdminHeader.jsx
      CheckInSection.jsx
      CheckInsList.jsx
      MemberForm.jsx
      MemberList.jsx
      TabNavigation.jsx
    ui/
      button.jsx
  lib/
    utils.js
  pages/
    AdminPage.jsx
    Dashboard.jsx
    MemberProfile.jsx
    WorkoutLogging.jsx

## Project Structure

```
gymflow-frontend/
│
├── public/
│   └── videos/           # Video resources for workouts and tours
│
├── src/
│   ├── assets/           # Static assets (images, icons, etc.)
│   ├── components/       # Reusable UI and feature components
│   │   ├── admin/        # Admin-specific components
│   │   └── ui/           # UI elements (buttons, etc.)
│   ├── lib/              # Utility functions
│   ├── pages/            # Main application pages
│   ├── App.jsx           # Main app component
│   ├── App.css           # App-wide styles
│   ├── index.css         # Global styles
│   └── main.jsx          # App entry point
│
├── package.json          # Project metadata and dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/kenshar/gymflow-frontend.git
cd gymflow-frontend
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint for code quality

---

## Technologies Used
- **React** — UI library for building interactive interfaces
- **Vite** — Fast build tool and development server
- **Tailwind CSS** — Utility-first CSS framework
- **PostCSS** — CSS processing

---

## Folder Overview
- `src/components/` — Reusable UI and feature components
- `src/components/admin/` — Admin-specific components
- `src/components/ui/` — UI elements (buttons, etc.)
- `src/pages/` — Main application pages
- `src/lib/` — Utility functions
- `public/videos/` — Video resources

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a pull request


---

## License

This project is licensed under the MIT License.

---