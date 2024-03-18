import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
const app = express();

import database from './config/dbconfig.js';
import router from './routes/routes.js';


app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

try {
    await database.authenticate();
    console.log("Database Connected Successfully");
} catch (error) {
    console.log("Connecting error " + error);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routing
app.use('/', router);

// Listen
app.listen(PORT, () => {
    console.log("Server running at port " + PORT);
});