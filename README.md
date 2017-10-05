This site allows users to interact with data from the [Georgian-Budget project API](https://github.com/ForSetGeorgia/Georgian-Budget-API).

## Get Started

1. Setup .env file
  1. `cp .env.example .env`
  1. Set `NODE_ENV` to 'development'
  1. Set `APP_URL` to `https://dev-budget.forset.ge` (domain name used for share)
  1. Set `API_URL` to `https://dev-budgetapi.forset.ge` (for now)
1. Install [docker](https://www.docker.com/products/overview)
1. `docker-compose build` (takes a while)
1. `docker-compose up`
1. Open [localhost:8080](http://localhost:8080)

If you want to use the API locally, then...

1. Change `API_URL` in the `.env` file to `http://localhost:3000`
1. [Setup the API app on your computer](https://github.com/ForSetGeorgia/Georgian-Budget-API#get-started)

## Prepaire server

### Install node, nvm [source](http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/), npm, [yarn](https://yarnpkg.com/en/docs/install), pm2
#### nvm & node
`sudo apt-get install build-essential checkinstall`
`sudo apt-get install libssl-dev`
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash`
exit and enter terminal back
`command -v nvm`
`nvm -l`
`nvm install v8.6.0`
`nvm use v8.6.0`
`nvm alias default node`

#### npm
`sudo apt-get update && sudo apt-get install npm`

#### yarn
`curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
`echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`

`sudo apt-get install yarn`

#### pm2
`npm install pm2 -g`
information commands
`pm2 startup`
`pm2 status`
`which pm2`

#### .bashrc

move next two lines above next four lines on server in .bashrc
```export NVM_DIR="/home/deploy/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

case $- in
    *i*) ;;
      *) return;;
esac
```


`. ~/.bashrc on`


## Deploy

1. Add your environment-specific config to `config/pm2/{env}.json` and `shipitfile.js`.
2. `shipit staging deploy` *
3. The first deploy won't work fully, because the `.env` file is missing on the server. Run `cp current/.env.example shared/.env` and then add the necessary environment variables to `.env`.
4. Run `shipit staging deploy` again
5. App should be running now. Run `pm2 startup` to get instructions from `pm2` on how to make the app server start up again whenever the server reboots.

* if shipit is not preinstalled - install globally npm install --global shipit-cli
## ReDUCKS

You may have noticed that redux reducers and actions in this repo are grouped into modules, called ducks, located in the `js/ducks` directory. [Learn more about ducks here](https://github.com/erikras/ducks-modular-redux).
