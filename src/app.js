require("dotenv").config({ path: "../.env" });
const express = require("express");
const path = require("path");
const PORT = process.env.PORT;
const requestHandler = require(path.join(__dirname, "./functions/requestHandler.js"));
const { redisClient } = require(path.join(__dirname, "./functions/redisClient.js"));
const app = express();


(async () => {
    await redisClient.connect();
    console.log(`connect to redis`);
})()

app.get("/", requestHandler);

app.listen(PORT, () => {
    console.log(`app running on http://localhost:${PORT}`);
})

