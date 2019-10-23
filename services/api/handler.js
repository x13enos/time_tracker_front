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
  let rawResponse = null;
  const response = {
    data: null,
    errors: null,
    code: null,
    success: () => {
      return status === 'success';
    }
  };

  const makeRequest = async () => {
    rawResponse = await axios.post('/api', { query });
    handleResponse();
    return response;
  };

  const handleResponse = () => {
    if (rawResponse.data.data != null) {
      status = 'success'
      response.data = rawResponse.data.data[actionMethod]
    } else {
      status = 'error'
      response.errors = rawResponse.data.errors[0].message
      checkErrorCode()
    }
  };

  const checkErrorCode = () => {
    const errorsData = rawResponse.data.errors[0]
    if(errorsData.extensions)
      response.code = errorsData.extensions.code
  }
}

export default handler;
