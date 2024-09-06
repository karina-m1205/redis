const axios = require("axios");

async function getRemoteData() {
    const information = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log("there was a request to a remote server");
    return information.data;
}

module.exports = getRemoteData;