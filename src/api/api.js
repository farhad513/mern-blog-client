import axios from "axios";
const local = "http://localhost:8080/api/v1";
const production = "https://mern-blog-ci8y.onrender.com/";

let api_url = "";
let mode = "production";

if (mode === "production") {
  api_url = production;
} else {
  api_url = local;
}
const api = axios.create({
  baseURL: `${api_url}/api`,
});

export default api;
