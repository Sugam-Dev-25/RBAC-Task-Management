require("dotenv").config();

const express = require("express");

const connectDB =
  require("./app/config/db");

const app = express();

connectDB();

app.use(express.json());

app.use(
  "/api/auth",
  require("./app/routes/authRoutes")
);

app.use(
  "/api/records",
  require("./app/routes/recordRoutes")
);

app.use(
  "/api/users",
  require("./app/routes/userRoutes")
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});