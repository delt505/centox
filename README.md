# Centox - Self-hosted form website

<a target="_blank" href="https://github.com/simonmaribo/centox">
    <img src="https://img.shields.io/github/stars/simonmaribo/centox" />
</a> 
<a target="_blank" href="https://github.com/simonmaribo/centox">
    <img src="https://img.shields.io/github/last-commit/simonmaribo/centox" />
</a>
<a target="_blank" href="https://github.com/simonmaribo/centox/releases">
    <img src="https://img.shields.io/github/v/release/simonmaribo/centox"/>
</a>

It is a self-hosted solution for creating/managing forms and applications. Users can login using their Discord Account. It is created to be used on Gaming/Discord communities, where as I couldn't find an alternative.

<img src="https://raw.githubusercontent.com/Simonmaribo/centox/master/public/github-images/application.png" width="1080" alt="" />

## ⭐ Features

- Create forms which only users with a specific role can see.
- Create roles for users to be able to use certain commands.
- Comment applications to be able to give feedback to the user.
- Create webhooks to be able to send messages to your own application!
- And much more!

## Websites using Centox
- [forum.envy-mc.dk](https://forum.envy-mc.dk)
- [forum.unicmc.net](https://forum.unicmc.net)
- [apply.mcsetups.dk](https://apply.mcsetups.dk)

## Installation

1. Install `Node 12.4.0+` and `Yarn 1.12.17+`
2. Clone the repository
   ```bash
   git clone https://github.com/simonmaribo/centox.git
   ```
3. Install the dependencies
   ```bash
   yarn install
   ```
4. Open the `.env.example` file and fill in the required information,
and rename to `.env`
5. Open `config.json` and fill in the required fields.
6. Run `yarn configure` and let the database be configured.
7. Run `yarn build`
8. To start the application run `yarn start`

You can use `yarn build-start` to build and start the application at the same time.

## Changes to the userinterface / frontend

Everytime you have changed the frontend (`/styles`, `/public`, `/pages` and `/components`),  
you will need to run `yarn build` for the changes to take effect.

# Nginx reverse proxy

The following configuration enables Nginx to act as reverse proxy for a Centox instance that is available at port 8080 on localhost:

```
server {
    server_name apply.example.net;
    listen 80;
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

Credit: [Minetrack](https://github.com/Cryptkeeper/Minetrack)

## Images

<img src="https://raw.githubusercontent.com/Simonmaribo/centox/master/public/github-images/edit.png" width="1080" alt="" />
<img src="https://raw.githubusercontent.com/Simonmaribo/centox/master/public/github-images/creating.png" width="1080" alt="" />
<img src="https://raw.githubusercontent.com/Simonmaribo/centox/master/public/github-images/profile.png" width="1080" alt="" />
<img src="https://raw.githubusercontent.com/Simonmaribo/centox/master/public/github-images/users.png" width="1080" alt="" />
