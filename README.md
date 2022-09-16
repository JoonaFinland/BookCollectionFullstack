# Fullstack Book collection

## Introduction

Simple Book collection Fullstack exercise.

### Development mode

Development mode opens the Express backend server and the React frontend app at the same time.

### Production mode

Not tested / implemented fully.

## Quick Start

```bash
# Clone or download the repository

# Go inside the directory
cd fullstack-books

# Install dependencies
npm install

# Start development server
npm run dev

# then open http://localhost:3000/ 

# Run tests
npm test

# Build for production (Not tested)
npm run build

# Start production server (Not tested)
npm start
```

## Documentation

### Folder Structure

- `src/`: Contains source code of the project
  - `server/`: Contains source code for the Express Backend server
    - `app.css`: CSS file for styles
    - `App.js`: Main react code file
    - `index.js`: index for the React app
  - `client/`: Contains source code for the React frontend client
    - `data.json`: The "database" file
    - `index.js`: The express backend app
    - `routes.js`: API endpoints for the server
    - `start.js`: Start script to start up backend server
    - `test.js`: Simple Jest / Supertest file
  - `reset.js`: Script to reset the database (used in `npm test`)
    

### Notes

Use webpack to simplify development by allowing live reloading.

Disabled automatically opening url, since the webpack opens the url too fast resulting in a connection error.

Nodemon used to monitor changes in files to reload server.

Concurrency package used to run the development command with two servers simultaneously.
