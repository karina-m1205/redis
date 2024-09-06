const path = require("path");
const { redisClient } = require(path.join(__dirname, "./redisClient.js"));
const getRemoteData = require(path.join(__dirname, "./getRemoteData.js"));

async function requestHandler(req, res) {
    try {
        let results;
        const cacheData = await redisClient.get("post");
        if (cacheData) {
            results = JSON.parse(cacheData);
        } else {
            results = await getRemoteData();
            if (!results) {
                throw new Error("API error");
            }
            await redisClient.set("post", JSON.stringify(results));
        }
        res.status(200).send(results);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports = requestHandler;