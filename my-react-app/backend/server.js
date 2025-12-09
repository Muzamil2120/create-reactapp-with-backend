import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE: receive signup form
app.post("/signup", (req, res) => {
  console.log("Received form data:", req.body);

  return res.json({
    success: true,
    message: "Signup form received successfully!",
    data: req.body
  });
});

// START SERVER
app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
