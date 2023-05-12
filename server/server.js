import express from "express";
import router from "./routes/routes.js";
import path from "path";
import session from 'express-session'

const app = express();

app.use(express.static("../client-react/build"));

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    cookie:('name','value',{
        maxAge:5*60*1000,
        secure:false
    })
}))

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client-react/build/index.html"));
});

app.listen(8000, () => console.log("Server is running on port 8000"));
