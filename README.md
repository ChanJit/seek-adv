# seek-adv

Seek Adv

#####*Ensure AWS credentials are set locally or this repo will error out when running NPM start* 

## Usage
### Build & Test
    $ npm run build
### Build & Publish Docker
    $ ./scripts/docker.sh [version] joralocal-ui
### Package Elastic Beanstalk
    $ ./scripts/package.sh [version] [environment] [logstash-server]
### Deploy
    $ ./scripts/deploy.sh [version] [environment]
### Smoke Test
    $ npm run smoke
### Debug (dev environment)
    $ cp dev.env .env
    $ npm start
