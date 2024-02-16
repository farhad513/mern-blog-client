import axios from "axios";
const local = "http://localhost:8080/api/v1";
const production = "";

let api_url = "";
let mode = "dev";

if (mode === "production") {
  api_url = production;
} else {
  api_url = local;
}
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default api;
