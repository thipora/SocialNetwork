import express from 'express';
import 'dotenv/config'
import { userRouter } from './router/userRouter.js'
import {logErrors} from './middleware/logError.js'

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use(logErrors);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
