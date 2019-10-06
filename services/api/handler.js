import axios from 'axios';
import queris from '@/services/api/endpoint_queries';

function handler(){

  this.perform = (passedActionMethod, data=null) => {
    actionMethod = passedActionMethod
    query = queris[actionMethod](data)
    return makeRequest();
  }

  // private logic
  let actionMethod = null;
  let query = null;
  let status = false;
  const response = {
    data: null,
    errors: null,
    success: () => {
      return status === 'success';
    }
  };

  const makeRequest = async () => {
    const headers = collectHeaders();
    const rawResponse = await axios.post('/api', { query }, { headers });
    handleResponse(rawResponse);
    return response;
  };

  const handleResponse = (rawResponse) => {
    if (rawResponse.data.data != null) {
      status = 'success';
      response.data = rawResponse.data.data[actionMethod];
    } else {
      status = 'error';
      response.errors = rawResponse.data.errors[0].message;
    }
  };

  const collectHeaders = () => {
    const headers = {};
    Object.assign(headers, authorizationHeaders() || {})
    return headers;
  }

  const authorizationHeaders = () => {
    const token = localStorage.getItem('authToken');
    if(token !== "undefined"){
      return {
        'Authorization': `Bearer ${token}`
      }
    }
  }
}

export default new handler();
