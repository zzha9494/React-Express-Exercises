import express from "express";
import router from "./routes/routes.js";

const app = express();

app.use(express.static("../client-react/build"));
app.use("/", router);

app.listen(8000, () => console.log("Server is running on port 8000"));
