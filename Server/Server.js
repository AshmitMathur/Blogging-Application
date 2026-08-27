import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import dns from 'node:dns';
import adminRouter from './routes/adminroutes.js';
import blogRouter from './routes/blogRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import newsletterRouter from "./routes/newsLetterRoutes.js";
import bookmarkRoutes from "./routes/BookMarkRoutes.js";

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();

await connectDB()

// MiddleWares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res)=> res.send("API is Working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/bookmark", bookmarkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log('Server is Running on port ' + PORT);
})

export default app;