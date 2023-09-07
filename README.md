# Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 
## Description

  This project involves building an API for a social network web application. Users can interact with the API to share their thoughts, react to their friends' thoughts, and manage their friend lists. The application utilizes Express.js for routing, a MongoDB database for data storage, and the Mongoose ODM (Object Data Modeling) for database interaction. Timestamps are formatted using JavaScript's Date object or an optional JavaScript date library.

  ## Table Of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Tests](#test)


  


  ## Installation
  
  Clone the Repo, go into the root of the project and run `npm install` setup the `.env` file and then run npm start. API testing can be done in Insomnia or Postman.

  ## Usage

  

  ## License

  This project is covered under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) Information regarding this license can be found at (https://opensource.org/licenses/MIT)

## Tests
API Routes
GET /api/users: Get all users.
GET /api/users/:id: Get a single user by ID.
POST /api/users: Create a new user.
PUT /api/users/:id: Update a user.
DELETE /api/users/:id: Delete a user.
POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.
GET /api/thoughts: Get all thoughts.
GET /api/thoughts/:id: Get a single thought by ID.
POST /api/thoughts: Create a new thought.
PUT /api/thoughts/:id: Update a thought.
DELETE /api/thoughts/:id: Delete a thought.
POST /api/thoughts/:thoughtId/reactions: Create a reaction to a thought.
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Delete a reaction to a thought.