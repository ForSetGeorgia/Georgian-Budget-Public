This site allows users to interact with data from the [Georgian-Budget project API](https://github.com/JumpStartGeorgia/Georgian-Budget-API).

## Get Started

1. Setup .env file
  1. `cp .env.example .env`
  1. Set `NODE_ENV` to 'development'
  1. Set `API_URL` to 'https://dev-budgetapi.jumpstart.ge' (for now)
1. Install [docker](https://www.docker.com/products/overview)
1. `docker-compose up` (takes a while)
1. Open [localhost:8080](http://localhost:8080)

If you want to use the API locally, then...

1. change `API_URL` in the `.env` file to 'http://localhost:3000'
1. setup the API app by following these [instructions](https://github.com/JumpStartGeorgia/Georgian-Budget-API#get-started)

## Deploy

For the first time:

1. Add your environment-specific config to `config/pm2.json` and `shipitfile.js`.
2. `shipit staging deploy`
3. The first deploy won't work fully, because the `.env` file is missing on the server. Run `cp current/.env.example shared/.env` and then add the necessary environment variables to `.env`.
4. Run `shipit staging deploy` again
5. App should be running now. Run `pm2 startup` to get instructions from `pm2` on how to make the app server start up again whenever the server reboots.

## ReDUCKS

You may have noticed that redux reducers and actions in this repo are grouped into modules, called ducks, located in the `js/ducks` directory. [Learn more about ducks here](https://github.com/erikras/ducks-modular-redux).
