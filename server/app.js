import express from 'express';
import 'dotenv/config'
import { userRouter } from './router/userRouter.js'
import { todoRouter } from './router/todoRouter.js'
import { postRouter } from './router/postRouter.js'
import { commentRouter } from './router/commentRouter.js'
import { passwordsRouter } from './router/passwordsRouter.js'
import { logErrors } from './middleware/logError.js'
import { authenticateToken } from './middleware/authenticateToken.js'
import loginController from './controllers/loginController.js'
import cors from 'cors';

const app = express();
app.use(express.json());

// const corsOptions = {
//   origin: 'http://localhost:8080'
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use('/passwords', passwordsRouter);
app.use('/login', loginController);
app.use(authenticateToken);
app.use('/users', userRouter);
app.use('/todos', todoRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use(logErrors);

app.get("*", function (req, res) {
    res.send("ERROR");
  });

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
