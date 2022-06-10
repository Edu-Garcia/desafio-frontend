import axios from 'axios';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 30000,
  headers: defaultHeaders,
});

class HttpClient {
  static api = axiosConfig;
}

export default HttpClient;
