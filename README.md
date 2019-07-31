# Tuppu

I got tired of having lame blogging tools, so I wrote my own using Webpack and TypeScript.

## Features

* Static site generator.  Absolutely zero JavaScript execution on the client!
* Write blog entries in Markdown. (With some extended notation features)
* Uses Handlebars templates for HTML output.
* USes TypeScript for Webpack plugin configuration and instantiation.
* Automatic robot.txt generation.
* Automatic sitemap generation.
* Automatic JSON API generation.
* Automatic SEO-friendly keyword generation based on frequency of words shown on a page.
* Minifies CSS.
* Provides favicon support for nearly all possible clients.

## Install

```
git clone git@github.com:Emblem21-OpenSource/tuppu.git tuppu
npm install
```

### Ngnix Setup

```
# Local machine
scp -r nginx.conf root@cultstate.com:/etc/nginx/sites-available/site.com
ssh root@cultstate.com

# Firewall
sudo apt-get install ufw
sudo ufw allow 'Nginx Full'
sudo ufw reload

# Nginx setup
sudo apt-get update
sudo apt-get install nginx
sudo mkdir /var/www/cultstate.com
sudo mkdir sites-availible/cultstate.com
ln -s /etc/nginx/sites-available/cultstate.com /etc/nginx/sites-enabled/cultstate.com

# SSH Setup
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx certonly

sudo crontab -e
# 17 7 * * * certbot renew --post-hook "systemctl reload nginx"
sudo systemctl restart nginx
```

## Development

### Unix

Open two terminals.  Run `npm run start-webpack-unix` in one and `npm run watch-typescript` in the other.

### Windows

Run `start-tuppu.bat`.  (Requires [Git Bash for Windows](https://git-scm.com/download/win))

## Deployment

To push to a release candidate to staging, run `npm run release-staging`

To push to a release candidate to production, run `npm run release-production`

## Feature Requests

* https://search.google.com/test/mobile-friendly
* https://backlinko.com/actionable-seo-tips
* JSON API should show links and image in `relationships`
* Add HTML Microdata specifications