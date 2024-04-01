import express from 'express';
import 'dotenv/config'
import { userRouter } from './router/userRouter.js'
import { todoRouter } from './router/todoRouter.js'
import { postRouter } from './router/postRouter.js'
import { commentRouter } from './router/commentRouter.js'
import {logErrors} from './middleware/logError.js'
import cors from 'cors';

app.use(cors());
const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use(logErrors);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
