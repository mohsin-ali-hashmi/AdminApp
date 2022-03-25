import axios from 'axios'
const baseDomain = 'https://naseem-java.herokuapp.com/organization';
const baseURL = `${baseDomain}/`
export default axios.create({
  baseURL,
  headers: {'Cache-Control': 'no-cache' , 'Content-Type' : 'application/json' }
});