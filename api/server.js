require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const uploadRoute = require("./routes/upload");

connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api", uploadRoute);
app.use("/api/admin", require("./routes/admin"));

app.get("/", (req, res) =>{
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
