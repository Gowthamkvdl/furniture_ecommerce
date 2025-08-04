import express from "express";
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
import userRoute from "./routes/user.route.js"
import orderRoute from "./routes/order.route.js"
import cors from "cors"
import path from "path";


const PORT = 3000
const app = express()

const allowedOrigins = [
  "http://localhost:5173", 
];

// ✅ Static file serving
app.use("/uploads", express.static("public/uploads"));

// ✅ Correct CORS configuration
app.use(   
  cors({
    origin: allowedOrigins, 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/user", userRoute)
app.use("/api/order", orderRoute)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on PORT ${PORT}`)   
})