const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  " sk_test_51OPCYxKQIKktaU2ljrs0vFJsGx9hOYoC18JUp6QHVqvlfheZEiJipxeITZ0xZXJVt7SGwPjFofFYpjJ8JKdE53Gw00FZiomADo"
);

// - App config
const app = express();


// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  console.log(paymentIntent);
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);



 
