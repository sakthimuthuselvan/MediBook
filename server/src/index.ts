import app from "./app.js"; 
import connectDB from "./config/dbConnect.js";
import dotenv from "dotenv";
dotenv.config()
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
