import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import Connection from './database/db.js';
import Router from './routes/Routes.js';

const app = express();
dotenv.config()

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/',Router)

const PORT = 8000

Connection()


app.listen(PORT,()=>console.log('server is running on port',PORT) )