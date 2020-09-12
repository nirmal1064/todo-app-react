import axios from "axios";

const development = process.env.NODE_ENV !== 'production'
const http = axios.create({
    baseURL: development? "http://localhost:8082/": "https://todoapi-mern.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
});
export default http;
