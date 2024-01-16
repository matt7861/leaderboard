# Frontend Test Task with WebSocket

## Goal
- Your goal is to create a website like the one in the video fe-test-task.mov
- The site must consume data from WebSocket and display it in a table.
- It must display the top 10 users, sorted by score, highest to lowest. If there are already at least 10 rows, and a new entry arrives from WebSocket, but it has a lower score than the existing top 10, then it should be ignored and not added to the list.
- The number of displayed results can be configured in Settings tab. By default it's 10.
- Each row has a delete button, clicking that will remove the row.

## Emitter
- The backend service that emits the random data already exists and can be used as is.
- To start it, you need to have Node.js installed, change directory to "emitter" and, run "npm i" and "npm start".
- It will start a Socket.io server on ws://localhost:3050

## Requirements
- Use React with hooks, TypeScript, WebSocket. Any other technologies are optional.
- You don't need to persist any data.
- The example in video uses Material UI.
- Your solution should include the same visual elements as in video, but the design doesn't have to be an exact match.
- Push your code to GitHub and share it with your hiring contact.
