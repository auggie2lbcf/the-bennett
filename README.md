README.md
Markdown

# The Bennett - A Windows 95-style Portfolio

This is a personal portfolio website built with Next.js and React, styled to replicate the nostalgic user interface of Windows 95.

### Live Demo

https://thebennett.net

## Description

This project serves as a creative portfolio to showcase my web development projects. Instead of a traditional layout, the portfolio is presented as a fully interactive, retro-style desktop environment. Projects can be launched from desktop icons, opening in draggable, minimizable, and maximizable windows that load the live websites within an iframe.

## Features

* **Windows 95 UI:** A faithful recreation of the classic Windows 95 desktop environment, built with modern CSS.
* **Interactive Desktop:** Draggable windows, a functional taskbar, and a start menu.
* **Dynamic Windows:** Open, close, minimize, and maximize project windows. The state is managed with React hooks.
* **Project Showcase:** Desktop icons launch modals that iframe live project websites.
* **Fun Extras:** Includes a bouncing logo screensaver and a fake "Blue Screen of Death" for added nostalgia.
* **Konami Code:** An easter egg triggered by the Konami code.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Library:** [React](https://reactjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via `globals.css` with custom styles)

## Getting Started

First, install the dependencies:

```bash
npm install
Then, run the development server:

Bash

npm run dev
Open http://localhost:3000 with your browser to see the result.

Project Structure
/app: The main application routing and layout files for Next.js.

/components: Contains all the React components for the UI, such as Desktop.tsx, Taskbar.tsx, and Win95Window.tsx.

/hooks: Custom React hooks for managing UI state (useUIState.ts) and window dragging (useDrag.ts).

/public: Static assets, including all the pixel-art icons used throughout the application.
