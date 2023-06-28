import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import cors from 'cors';
require('dotenv').config();

let app = express();

let port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const corsOptions = {
    origin: true,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

configViewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Moi truy cap vao link http://localhost:${port}`);
})