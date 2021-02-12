import axios from 'axios';

const tokenAuth = token => {
  token 
    ? axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    : delete axios.defaults.headers.common['Authorization'];
}

export default tokenAuth;