# Backend for CoffeeDoor Brewbar & Coffee shop with Stripe payment

Full backend part for CoffeeDoor online store with Stripe payment

![Logo](https://i.ibb.co/VxVb9gn/logo-700x191.webp)

## Technologies

-   Node JS, Express, Express Validator, Mongoose, Yup, JWT, Bcrypt, Stripe
-   Database: Mongo DB

## Features

-   Get store items with images
-   Express validator for field validations
-   JWT Token for auntification
-   Bcrypt for creating password hash
-   3 models for database: Store, Users, Orders
-   CRUD operations for models
-   Get aggregated info about users orders
-   Payment intend and payment refund
-   Stripe Webhook for updating database with new orders

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_DB`

`STRIPE_SECRET_KEY`

`WEBHOOK_SECRET_KEY`

`TOKEN_SECRET_KEY`

`IMAGE_BASE_URL`

## Deploy on Heroku

[https://stripe-express-backend-dd1bc05a0061.herokuapp.com](https://stripe-express-backend-dd1bc05a0061.herokuapp.com)

## Run Locally

Clone the project

```bash
  git clone https://github.com/DKotykhin/Stripe-backend.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
npm run dev
# or
yarn
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

## Author

-   [@DKotykhin](https://github.com/DKotykhin)
