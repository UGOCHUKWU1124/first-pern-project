import express from "express";
import dotenv from "dotenv";
import helmet from "helmet"; // Security middleware that helps secure apps by setting various HTTP headers
import morgan from "morgan"; // HTTP request logger that can log requests to the console and files
import cors from "cors";
import pool from "./config/db.js"; // Import the PostgreSQL connection pool

import productRoutes from "./routes/productRoutes.js";



dotenv.config(); // Load .env variables first


const app = express(); // Create express app


// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Use Helmet for security
app.use(morgan("dev")); // Use Morgan for logging

// ✅ CORS Setup: Allow your Vercel frontend
app.use(cors({
    origin:  "https://hugo-pern-project.vercel.app", // This is your actual frontend domain
    credentials: true
}));

//test route to check if server is running
app.get("/", (req, res) => {
    res.send("Backend Server is running");
}); 

// Middleware
app.use(express.json()); // Accept JSON payloads

// Routes
app.use("/api/products", productRoutes); // Products API
app

// ✅ Test DB connection before starting the server
    pool.connect()
    .then(client => {
        console.log('PostgreSQL connected');
        client.release(); // always release the client back to the pool

        // Start server only if DB is connected
        const PORT = 3000;
        app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL:', err.message);
    });
