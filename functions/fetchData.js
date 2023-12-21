// functions/fetchData.js

const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
