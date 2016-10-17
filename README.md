This site allows users to interact with data from the [Georgian-Budget project API](https://github.com/JumpStartGeorgia/Georgian-Budget-API).

## Deploy

For the first time:

1. Add your environment-specific config to `config/pm2.json` and `shipitfile.js`.
2. `shipit staging deploy`
3. The first deploy won't work fully, because the `.env` file is missing on the server. Run `cp current/.env.example shared/.env` and then add the necessary environment variables to `.env`.
4. Run `shipit staging deploy` again
5. App should be running now. Run `pm2 startup` to get instructions from `pm2` on how to make the app server start up again whenever the server reboots.

## ReDUCKS

Redux reducers and actions in this repo are grouped into modules, called ducks. [Learn more here](https://github.com/erikras/ducks-modular-redux).
