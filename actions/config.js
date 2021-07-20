import axios from "axios";
import cookie from 'js-cookie';
export const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + cookie.get('token'),
  }

};


export const config2 = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + cookie.get('token'),
  }

};

// Post Request
export const postHttp = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    //console.log(config)
    console.log("body::", body)
    const res = await axios.post(url, body, config);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    returnObject.data = err.response;
    return returnObject;

  }
};



// Post Request
export const postHttp2 = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    const res = await axios.post(url, body, config2);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    returnObject.data = err.response;
    return returnObject;
  }
};



// Put Request
export const putHttp = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    const res = await axios.put(url, body, config2);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    returnObject.data = err.response;
    return returnObject;
  }
};

// Put 2 Request
export const putHttp2 = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    const res = await axios.put(url, body, config);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    returnObject.data = err.response;
    return returnObject;
  }
};


// Get Request
export const getHttp = (url, body) => async dispatch => {
  const returnObject = {};
  //console.log(config)
  try {
    const res = await axios.get(url, config);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    return err
    // const res = await axios.get(url, config); 
    // returnObject.data = res.data;
    // return returnObject;
  }
};

// get request 2
export const getHttp2 = async (url, body) => {
  const returnObject = {};
  //console.log(config)
  try {
    console.log('url', url)
    console.log('config', config)
    const res = await axios.get(url, config);
    console.warn(res)
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    return err
    // const res = await axios.get(url, config);
    // returnObject.data = res.data;
    // return returnObject;
  }
};


// remove Request
export const removeHttp = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    const res = await axios.delete(url, config);
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    return err;
  }
};



// for remove media
export const removeMediaHttp = (url, body) => async dispatch => {
  const returnObject = {};
  try {
    const res = await axios.delete(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + cookie.get('token'),
      },
      data: {
        id: body
      }
    });
    returnObject.data = res.data;
    return returnObject;
  } catch (err) {
    return err;
  }
};
