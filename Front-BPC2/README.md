# Front-BPC2 Project

This project is a React application built using Vite. It is structured to facilitate easy development and deployment, particularly to GitHub Pages.

## Project Structure

- **src/components**: Contains React components used throughout the application.
- **src/assets**: Holds static assets such as images, fonts, and styles.
- **src/pages**: Contains page components that represent different views in the application.
- **src/App.tsx**: The main application component that sets up routing and layout.
- **src/main.tsx**: The entry point of the application that renders the App component into the DOM.
- **public/index.html**: The main HTML file for the application, including the root div for the React app.
- **.github/workflows/deploy.yml**: GitHub Actions workflow configuration for deploying the application to GitHub Pages.
- **vite.config.ts**: Configuration file for Vite, setting up the development server, plugins, and module resolution.
- **package.json**: Configuration file for npm, listing dependencies, scripts, and metadata for the project.
- **.gitignore**: Specifies files and directories to be ignored by Git.

## Deployment Instructions

To deploy this project to GitHub Pages, follow these steps:

1. **Update Vite Configuration**: Ensure that the `vite.config.ts` file includes the following line to set the base path for GitHub Pages:
   ```typescript
   base: '/Front-BPC2/',
   ```

2. **Configure GitHub Actions**: The `.github/workflows/deploy.yml` file is set up to automatically deploy the project when changes are pushed to the `main` branch. The workflow includes steps to check out the code, set up Node.js, install dependencies, build the project, and deploy it to GitHub Pages.

3. **Build Script**: Ensure that the `package.json` file includes a build script:
   ```json
   "scripts": {
     "build": "vite build"
   }
   ```

4. **Push Changes**: After making the necessary updates, commit your changes and push them to the `main` branch of your repository. The GitHub Actions workflow will trigger and deploy your application to GitHub Pages.

## Usage

To run the application locally, use the following command:

```bash
npm install
npm run dev
```

This will start the development server, and you can view the application in your browser at `http://localhost:8080`.