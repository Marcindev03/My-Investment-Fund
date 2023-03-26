# My Investment Fund

Simple web admin panel that simulates investment fund.

## Technologies

### Monorepo
* Turborepo

### Admin panel theme
* [Notus Next.js Tailwind](https://demos.creative-tim.com/notus-nextjs/)

### Front-end
* React
* Typescript (not every file is written in TS because of Admin panel theme)
* Next.js
* TailwindCSS (v. 2.0.4 because of Admin panel theme)
* Redux Toolkit

### Backend
* Strapi REST API

### External APIs
* [Currency Converter](https://rapidapi.com/natkapral/api/currency-converter5/details)


## Development Setup
1. Make sure you have `Node.js` and `Docker` installed
2. Run `apps/backend/docker-compose.yaml` file
3. Install dependencies from project root directory
```bash
yarn 
```
5. Run apps in development mode
```bash
yarn dev
```
6. Seed database. Go to `apps/backend` and run
```bash
yarn seed_all
```
7. Configure backend. Open strapi administration panel on http://localhost:1337/admin and register admin account. <br> Then navigate to http://localhost:1337/admin/settings/users-permissions/roles and check every permission for `Admin`, `Authenticated` and `Public`. <br>
http://localhost:1337/admin/content-manager/collectionType/plugin::users-permissions.user create user by clicking create new entry button. Add `Admin` role to this new user. <br>
Same here with client http://localhost:1337/admin/content-manager/collectionType/api::client.client. When creating client add relation with investments, operations and user you've just created. 
8. Now you can go and login into web app http://localhost:3000/auth/login Use email and password from user you created in step 7

## Admin Web interface overview
* [Dashboard](http://localhost:3000/admin/dashboard) - Dashboard with basic statistics and couple of charts
* [Operations](http://localhost:3000/admin/operations) - List of operations (deposit or withdrawals). Here we can request for new operation
* [Investments](http://localhost:3000/admin/investments) - List of investments (buy / sell currencies). Here you can request for new investment
* [Requests](http://localhost:3000/admin/requests) - List of operations and investments that haven't beed confirmed yet
* [Clients](http://localhost:3000/admin/clients) - List of clients of investment fund. Here you can manage their accounts and add new ones

There is not page for register because this fund is not publicly open. If someone wants to be the client of this fund admin has to create new account.

## Build & Start
1. Run build command from project root directory
```bash
yarn build
```
2. Start web
```bash
yarn start:web
```
3. Start backend
```bash
yarn start:backend
```

## Project Notion Board
https://tourmaline-year-f8e.notion.site/c2c0d110ca68417885a2dd2fd014ab6a?v=63dc43c18b2d49d2b54dd19381c7cb5e
