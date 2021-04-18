
## Player Archive

Watch it in action: https://www.loom.com/share/6d0f4a624e6e45a8b4d767811b66f0da

Player Archive is made with React.js, Node.js and Typescript

# Folder structure:
  
  Frontend

    — src    
      - components // All the components for the app
      - {component}.css // CSS for specific components
      - App.tsx // Starting point of the app
    
 Server
 
     — src
	    - data // Data Folder 
          - profile // Profile jsons
          - player // Player jsons
       - index.ts // Starting point of the server

The server has a data folder which holds the data for Players and Profile. A node.js server serves this data via a rest API (server/index.ts).
The types are defined in a file called types.ts and used across in frontend and server.
The frontend is a react app with components which has a search box and displays the player profile when it is active.

Webpack is used to build both the frontend and server individually for development and production.
# Scripts

Development

## Frontend:

cd frontend

npm install

npm start

Go to http://localhost:3000

## Node.js Server

cd server

npm install

npm run dev

Go to http://localhost:5000


## Production


Frontend:

npm run build

Server:

npm run build
