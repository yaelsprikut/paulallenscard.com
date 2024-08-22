const axios = require('axios').default
exports.handler = async (event) => {
    console.log("event!!! queryStringParameters", event.queryStringParameters)
    const HEADERS = {
        "Accesss-Control-Allow-Origin": "*",
        "Accesss-Control-Allow-Credentials": true,
        "Accesss-Control-Allow-Headers": "*"
    }
    const responseData = await axios.get(`http://newsapi.org/v2/top-headlines?country=${event.queryStringParameters.country}&pageSize=30&apiKey=${REACT_APP_API_ACCESS_TOKEN}`).then(function (response) {
            return response.data
        }).catch(function (error) {
            console.log(error)
        })
      const response = await responseData;
    return {
        statusCode: 200,
        body: response,
        headers: HEADERS
    } || "nope";
};
