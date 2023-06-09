# Base Express Theme

A simple express project template. 

This template is using : 

* Express
* Mongo
* Body-parser
* Cookie-parser
* Pino
* Dotenv
* Cors

## Environment Variables

There is few env variables that you can can see and edit in the .env


## Installation

Download the repo
```bash
  git clone git@github.com:DamienFoulon/express-base-theme.git
  cd express-base-theme
```

Install the dependencies
```bash
  npm install
```
    
## Run Locally

```bash
  npm run start
```


## Deployment

You can Dockerizing the theme too, by following these instructions :

```bash
  # Build the docker image
  docker build . -t dockerized-express-base-theme

  # Check the image was correctly created
  docker images | grep dockerized-express-base-theme

  # Deploy the image with port 8000 mapped on 8000 localhost
  docker run -p 8000:8000 -d dockerized-express-base-theme
```
## Authors

- [@DamienFoulon](https://www.github.com/DamienFoulon)

*Feel free to use and share this repo, a small star would be welcome.*

