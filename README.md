# GymFlow Frontend

GymFlow Frontend is a modern web application designed to streamline gym management for both members and administrators. Built with React, Vite, and Tailwind CSS, it offers a fast, responsive, and user-friendly experience.

---
[Live link](https://kenshar.github.io/gymflow-frontend/)

[Backend Repo Link](https://github.com/kenshar/gymflow-backtend)


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

---

## License

This project is licensed under the MIT License.

---
=======
A modern, responsive React application for gym management, built with cutting-edge technologies to provide an intuitive and efficient experience for both gym administrators and members.

##  About GymFlow

GymFlow is a comprehensive gym management system designed to streamline operations for fitness centers. The frontend application offers a sleek, user-friendly interface for managing memberships, tracking attendance, logging workouts, and handling administrative tasks.

##  Features

### Public Features
- **Landing Page**: Engaging hero section with video background showcasing gym facilities
- **About Section**: Information about the gym's mission and values
- **Services**: Overview of available fitness programs and services
- **Upcoming Classes**: Display of scheduled fitness classes and events

### Admin Dashboard
- **Member Management**: Complete CRUD operations for gym members
- **Check-in System**: Real-time member check-in with validation and feedback
- **Attendance Tracking**: Automatic attendance recording and reporting
- **Workout Logging**: Track member workouts and exercise progress
- **Payment Management**: Monitor membership payments and due dates
- **Membership Monitoring**: Track active/inactive memberships and expiration dates

### Key Capabilities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live check-in feedback and status updates
- **Data Persistence**: Local storage integration for offline functionality
- **Intuitive Navigation**: Clean tab-based interface for admin operations
- **Form Validation**: Comprehensive input validation and error handling

## Tech Stack

### Frontend Framework
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router DOM** - Declarative routing for React applications

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Beautiful & consistent icon library
- **Class Variance Authority (CVA)** - Flexible component styling
- **Tailwind Merge** - Intelligent class merging

### Development Tools
- **ESLint** - JavaScript linting utility
- **PostCSS** - CSS processing tool
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries
- **React Hot Toast** - Toast notifications
- **clsx** - Conditional CSS classes

##  Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control


## Usage

### For Gym Administrators

1. **Access Admin Dashboard**
   - Navigate to `/admin` in your browser
   - The application uses local authentication for demo purposes

2. **Member Management**
   - Add new members with personal details, membership plans, and exercise allocations
   - Edit existing member information
   - Delete inactive members
   - View comprehensive member profiles

3. **Check-in Operations**
   - Select members from dropdown for quick check-in
   - Automatic validation for membership status and daily check-in limits
   - Real-time feedback for successful/failed check-ins

4. **Monitoring & Reporting**
   - Track daily attendance
   - Monitor payment statuses
   - View workout progress and frequency

### Navigation
- Use the tab navigation in the admin panel to switch between "Members" and "Check-in" sections
- Responsive design ensures optimal viewing on all devices

##  Project Structure

```
gymflow-frontend/
├── public/
│   ├── videos/
│   │   └── gym-background.mp4
│   └── gymflow.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── CheckInSection.jsx
│   │   │   ├── CheckInsList.jsx
│   │   │   ├── MemberForm.jsx
│   │   │   ├── MemberList.jsx
│   │   │   └── TabNavigation.jsx
│   │   ├── ui/
│   │   │   └── button.jsx
│   │   ├── About.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Login.jsx
│   │   ├── MemberFormModal.jsx
│   │   ├── Services.jsx
│   │   └── Upcoming.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MemberProfile.jsx
│   │   └── WorkoutLogging.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## API Integration

This frontend is designed to work with the GymFlow backend API. The backend provides:

- **Authentication**: JWT-based user authentication
- **Members API**: CRUD operations for member management
- **Attendance API**: Check-in and attendance tracking
- **Workouts API**: Exercise and workout logging
- **Memberships API**: Membership plan management

### Backend Repository
For the complete system, ensure the [GymFlow Backend](https://github.com/your-repo/gymflow-backend) is running.

### Production Configuration

When deploying to production, update the API base URL:

1. **Create environment file**: `.env.production`
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

2. **Or set in deployment platform**:
   - **Vercel**: Environment variables in dashboard
   - **Netlify**: Build environment variables
   - **GitHub Pages**: Use public environment or build-time substitution

The app defaults to `http://localhost:5000` for development.

## Customization

### Styling
- Modify `tailwind.config.js` for custom color schemes and design tokens
- Update component styles in individual JSX files
- Customize the video background by replacing `/public/videos/gym-background.mp4`

### Features
- Add new admin features by creating components in `src/components/admin/`
- Extend member functionality in the pages directory
- Integrate additional APIs by updating component logic

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Notes

- **State Management**: Currently uses React's built-in state management with localStorage persistence
- **Data Flow**: Props-based data flow with callback functions
- **Styling Approach**: Utility-first CSS with Tailwind classes
- **Component Architecture**: Modular component structure with separation of concerns

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the backend documentation for API-related queries

## Authors

Kennedy Ng'ang'a (kenshar)
Branice Simaloi (simaloibranice-boop)
Allan Ratemo (pyrxallan)
Linda Jerop (Linda-Jerop)
Derrick Koome (Derrickkoome)

## License

This project is licensed under the MIT License - see the LICENSE file for details.


---

**Built with ❤️ for fitness enthusiasts and gym operators**
>>>>>>> 8e0d019 (Updated README.md to describe GymFlow frontend application features, tech stack, and usage)
