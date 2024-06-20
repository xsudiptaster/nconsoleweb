const axios = require('axios');
const refresh = async (data) => {
  try {
    let params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('client_id', data.CLIENT_ID);
    params.set('refresh_token', data.refresh_token);
    const response = await axios.post(data.instance_url + '/services/oauth2/token', params.toString());
    console.log('🚀 ~ refresh ~ response:', response);
    return response.data;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};
module.exports = refresh;
