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

- **Member Login & Profile Management:** Secure authentication and personalized member profiles.
- **Admin Dashboard:** Manage members, view check-ins, and access analytics.
- **Check-In System:** Track member attendance and activity.
- **Workout Logging:** Members can log workouts and view history.
- **Responsive UI:** Mobile-friendly design using Tailwind CSS.
- **Video Resources:** Embedded videos for workouts and gym tours.
- **Service Information:** Display gym services and upcoming events.
- **Breadcrumb Navigation:** Easy navigation across pages.
- **Reusable Components:** Modular design for maintainability.

---

## Screenshots

> _Add screenshots here to showcase the UI and features._

---

## Project Structure

```
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
- **ESLint** — Linting for code quality
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

Please ensure your code follows the existing style and passes linting checks.

---

## License

This project is licensed under the MIT License.

---

## Contact & Support

For questions, issues, or feature requests, please open an issue on GitHub or contact the maintainer at [kenshar](https://github.com/kenshar).

---

## Acknowledgements
- Thanks to all contributors and the open-source community.
- Inspired by modern gym management needs and best practices in web development.
