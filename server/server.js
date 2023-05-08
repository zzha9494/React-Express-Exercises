import express from "express";
import router from "./routes/routes.js";
import path from "path";

const app = express();

app.use(express.static("../client-react/build"));
app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client-react/build/index.html"));
});

app.listen(8000, () => console.log("Server is running on port 8000"));
