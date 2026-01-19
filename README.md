# GymFlow Frontend

GymFlow Frontend is a modern web application designed to streamline gym management for both members and administrators. Built with React, Vite, and Tailwind CSS, it offers a fast, responsive, and user-friendly experience.

---
[Live link](https://kenshar.github.io/gymflow-frontend/)

[Backend Repo Link](https://github.com/kenshar/gymflow-backtend)


## Table of Contents
- [Features](#features)
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

<<<<<<< HEAD
---


## Development Notes

- **State Management**: Currently uses React's built-in state management with localStorage persistence
- **Data Flow**: Props-based data flow with callback functions
- **Styling Approach**: Utility-first CSS with Tailwind classes
- **Component Architecture**: Modular component structure with separation of concerns

---

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the backend documentation for API-related queries

---

## Authors

1. Kennedy Ng'ang'a (kenshar)
2. Branice Simaloi (simaloibranice-boop)
3. Allan Ratemo (pyrxallan)
4. Linda Jerop (Linda-Jerop)
5. Derrick Koome (Derrickkoome)

=======
>>>>>>> README
---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
<<<<<<< HEAD


---

=======
=======
>>>>>>> README
A modern, responsive React application for gym management, built with cutting-edge technologies to provide an intuitive and efficient experience for both gym administrators and members.

##  About GymFlow

GymFlow is a comprehensive gym management system designed to streamline operations for fitness centers. The frontend application offers a sleek, user-friendly interface for managing memberships, tracking attendance, logging workouts, and handling administrative tasks.

##  Features

### Public Features
- **Landing Page**: Engaging hero section with video background showcasing gym facilities
- **About Section**: Information about the gym's mission and values
# GymFlow Frontend

GymFlow Frontend is a modern, responsive React application that helps fitness centers manage members, check-ins, workout logging, and administrative tasks.

[Live site](https://kenshar.github.io/gymflow-frontend/) • [Backend repo](https://github.com/kenshar/gymflow-backtend)

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

---

## Overview

GymFlow provides a clean, mobile-first UI (Tailwind CSS) and a set of admin tools for managing memberships, attendance, and workouts. The frontend is built with React and bundled by Vite.

## Features

- Member registration, login, and profile management
- Admin dashboard with member CRUD and check-in management
- Real-time check-in feedback and attendance tracking
- Workout logging and history per member
- Embedded video resources and service/event listings
- Responsive design and reusable UI components

## Tech Stack

- React
- Vite
- Tailwind CSS
- PostCSS
- ESLint

## Project Structure

```
gymflow-frontend/
├── public/
│   ├── videos/
│   └── gymflow.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   └── ui/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Install and run locally

```bash
git clone https://github.com/kenshar/gymflow-frontend.git
cd gymflow-frontend
npm install
npm run dev
```

Open http://localhost:5173 to view the app.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Deployment

This project sets `base` in `vite.config.js` to `/gymflow-frontend/` for GitHub Pages. A GitHub Action is configured to build the app and publish `dist/` to the `gh-pages` branch.

Deployment is automated via GitHub Actions: the repository workflow builds the site and publishes `dist/` to GitHub Pages when changes are pushed to `main` or `README`.

If you need to deploy manually (not recommended), you can still build locally with:

```bash
npm run build
```

Set `VITE_API_URL` in your production environment to point to the backend API.

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/name`
3. Commit changes
4. Push and open a PR

Please follow the existing code style and run lint before submitting.

## Authors

- Kennedy Ng'ang'a (kenshar)
- Branice Simaloi (simaloibranice-boop)
- Allan Ratemo (pyrxallan)
- Linda Jerop (Linda-Jerop)
- Derrick Koome (Derrickkoome)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Built with ❤️ for fitness enthusiasts and gym operators.
