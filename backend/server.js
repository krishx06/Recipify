import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();
connectDB();
app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
