# Instagram Clone

## Goal

The goal of this project is to create an Node.js application from scratch that replicate Instagram use cases. 

## Restrictions

1. This application must be only an API.
2. Do not use frameworks like MERN / MEAN.

## User Stories

[x] User can register for an account storing their name, email/username and password then login to the app using their credentials

[~] User can create a post and store images to the server (Preferably in a database)

[ ] User has a profile that displays all the images they have uploaded

[ ] User can follow other users

[ ] User can see other users posts (people who the user follows)

## Bonus features

[ ] User can see a global feed of images

[ ] User can send messages to other users

[ ] User can create a story for followers

## Development

# Init Local Server
1. Init docker compose watch server using `docker compose watch dev`
2. Install npm packages in the mounted volume `docker compose exec dev npm install`
3. Init ts compiler watcher using `docker compose exec dev npm run start:dev`