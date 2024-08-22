export const axios = require('axios').default

export const getTopHeadlines = async (country: string) => {
    const responseData = axios.get('https://gktc67guayda7mce55x6m4p2zi0icyxy.lambda-url.us-east-1.on.aws/', {
      params: {
        country: country ? country : 'ca'
      }
    })
    .then(function (response: any) {
      console.log(response)
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
    });
    return responseData
}
