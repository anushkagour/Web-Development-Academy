# WebDev Academy – Responsive Web Development Project

## Open the project
1. Extract the ZIP.
2. Open the `WebDev_Academy` folder in VS Code.
3. Open `index.html` using Live Server or a browser.
4. Use the navigation to visit the five unit pages.

## New features
- Responsive navigation menu for smaller screens.
- Responsive chapter cards, lesson layouts and diagrams.
- Student demo sign-in using name and QID.
- Unit completion checkboxes and an overall progress bar.
- Progress is saved in the current browser using localStorage.
- QID is hashed locally where Web Crypto is available; it is not sent to a server.
- Settings: dark theme, larger text, reduced motion and high contrast.
- Settings and progress persist in the current browser.

## Important login limitation
This is a front-end academic demonstration, not secure authentication. A browser-only project cannot verify that a name/QID pair belongs to a real student, and local browser storage can be cleared or changed. Do not deploy it publicly with real student identifiers. For a real login system, add a backend, database, HTTPS, server-side password/identity verification, and appropriate privacy protections. A QID should not be treated as a password.

## Technologies
HTML5, CSS3, JavaScript, SVG, localStorage and Web Crypto (where supported).
