const local = "http://localhost:8080";

const production = "https://mern-blog-ci8y.onrender.com";

let base_url = "";
let mode = "production";
if (mode === "production") {
  base_url = production;
} else {
  base_url = local;
}

export { base_url };
