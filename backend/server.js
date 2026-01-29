import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import mongoose from 'mongoose'
// app config
const app = express() 
const port = process.env.PORT || 4000
app.use(express.urlencoded({ extended: true }));

// Connect to database (CALL THE FUNCTION)
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)
app.use((error, req, res, next) => {
    console.log('❌ ERROR HANDLER:', error.message);
    if (error.message.includes('multipart') || error.message.includes('busboy')) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid file format. Use proper image file.' 
        });
    }
    res.status(500).json({ success: false, message: error.message });
});
app.use((error, req, res, next) => {
    if (error.message.includes('Malformed')) {
        return res.status(400).json({ 
            success: false, 
            message: 'Fix Postman form-data: image=File, others=Text' 
        });
    }
    next(error);
});


app.get("/", (req, res) => {
  res.send("API Working")
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  if (state === 1) {
    res.send('Database is connected');
  } 
  else {
    res.status(500).send('Database is NOT connected');
  }
});


app.listen(port, () => console.log(`Server started on PORT:${port}`))
