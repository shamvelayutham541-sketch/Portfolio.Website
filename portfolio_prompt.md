# Comprehensive Prompt for Portfolio Website Development

**Role:** Expert Front-End Web Developer and UI/UX Designer specialized in highly interactive, 3D, and animated web applications.

**Task:** Build a cutting-edge, heavily animated, and interactive personal portfolio website based on the specifications below. The website must feel premium, dynamic, and state-of-the-art, with a strong focus on seamless transitions and 3D elements.

## 1. Tech Stack Requirements
Strictly use the following technologies:
- **Core:** React JS (use functional components and hooks)
- **Animations:** Framer Motion (for smooth, complex page and element animations)
- **3D Elements:** Three.js / React Three Fiber (for 3D models, icons, and interactions)
- **Backgrounds:** Particles.js / tsParticles (for interactive background particles)
- **Styling:** CSS/TailwindCSS (ensure dark theme by default with gradient blurs)

## 2. Design & Aesthetics
- **Theme:** Dark themed with vibrant, glowing gradient blurs (glassmorphism effects) in the background to give a modern, premium feel.
- **Responsiveness:** Must be strictly mobile-compatible and fully responsive across all screen sizes (desktop, tablet, mobile).
- **Page Structure:** Multi-page application where each section lives on its own page.
- **Transitions:** Seamless, full-page transitions between routes using Framer Motion. Each page should have its own unique entrance and exit animation style.

## 3. Core Features & Interactivity
- **Heavy Animations:** Almost every element should have a micro-animation (hover, scroll-reveal, click).
- **Hero Section:** Must feature interactive 3D animated icons (using Three.js) floating or reacting to mouse movements.
- **Background:** Interactive Particles.js background that reacts to cursor movement and clicks, overlaying the gradient blurs.

## 4. Required Pages / Sections
Please implement the following sections, each navigating seamlessly:

1. **Hero / Home:**
   - Striking introduction.
   - 3D animated icons (Three.js).
   - "Call to Action" button (e.g., "View My Work" or "Hire Me").
   - Social links underneath CTAs (Instagram, Twitter, LinkedIn, GitHub, Email).

2. **About Me:**
   - Split layout: left side has a 3D animated avatar/card (floating, rotating slightly), right side has bio text.
   - Bio: "I'm Sham, a passionate first-year Artificial Intelligence & Data Science student at Rathinam Technical Campus, Coimbatore — a curious builder who loves exploring the intersection of design and technology. My journey started with a fascination for how things work on the internet, which quickly evolved into a drive to build beautiful, highly interactive web experiences. I'm constantly learning new frameworks and tools to push the boundaries of what's possible on the web."
   - Animated stat counters: Skills in Progress · 1st Year AI&DS · Coimbatore, TN
   - Background: drifting gradient blur orbs, no particles on this page
   - Page transition: slide in from the right with Framer Motion AnimatePresence

3. **My Skills:**
   - Visual representation of technical and soft skills.
   - Use animated progress bars, floating skill badges, or a 3D skill sphere.

4. **Projects Section:**
   - Showcase of past work.
   - **Feature:** 3D animated project cards when hovering (using Framer Motion / Three.js tilt effects).

5. **Coding Profiles:**
   - Links/cards for competitive programming profiles (e.g., LeetCode, Codeforces, HackerRank, GitHub).

6. **Featured Articles:**
   - A blog or articles section displaying featured technical writing or publications.

7. **Contact / Let's Connect:**
   - Two-column layout matching a premium terminal/network aesthetic.
   - **Left Column:** "GET IN TOUCH" subtitle, "Contact Me" large heading, and a descriptive paragraph. Below it, two contact info cards (Email: shamvelayutham541@gmail.com, Location: Coimbatore, India).
   - **Right Column:** A sleek contact form with inputs for Your Name, Email Address, Subject, and Message. Includes a glowing cyan "Send Message" button.
   - **Background:** Interactive network particles connecting dots.

## 5. Execution Instructions
- Provide the complete folder structure and necessary setup commands (e.g., `npm install ...`).
- Provide the code for the main `App.js` or routing configuration with Framer Motion page transitions (`AnimatePresence`).
- Provide the code for the interactive background (`Particles`) and 3D hero components (`Canvas` from React Three Fiber).
- Ensure all components are modular, clean, and well-documented.
