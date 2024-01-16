# Frontend Task with WebSocket

## Overview

This project is a simple web application that displays a leaderboard consuming data from a WebSocket server. It's built using React with hooks and TypeScript, and styled with Material UI. The application showcases real-time data handling and dynamic UI updates.

## Goal

The primary objective is to create a website similar to the one demonstrated in the provided video. The site listens to data from a WebSocket and displays it in a sortable table, featuring a real-time leaderboard.

## Running the Emitter

The backend service (emitter) that emits random data is already set up. Follow these steps to get it running:

Navigate to the emitter directory in the project.
Run npm install to install the necessary packages.
Execute npm start to start the Socket.io server.
The server will run on ws://localhost:3050.

## Running the Frontend

To run the frontend application, follow these steps:

Ensure the emitter is running as per the above instructions.
In the root directory of the project, run npm install to install dependencies.
Execute npm run dev to start the Vite server.
The application will be available at http://localhost:3000.
