const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const AuthorRouter = require("./router/author.routes");
const BookRouter = require("./router/book.routes");
const CitationRouter = require("./router/citation.routes");
const errorMiddleware = require("./middleware/error.middleware");
const AuthRouter = require("./router/auth.routes");
const cookieParser = require("cookie-parser");
const ProfileRouter = require("./router/profile.routes");
const AudioBookRouter = require("./router/audio.routes");
require("dotenv").config();
const path = require("path")

const app = express();
const PORT = process.env.PORT || 4001;



// 📂 static uploads
app.use("/uploads", express.static("uploads"));

// 🧩 Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// 💾 MongoDB
connectDB();

// 🔗 Routers
app.use("/api/auth", AuthRouter);
app.use("/api/authors", AuthorRouter);
app.use("/api/books", BookRouter);
app.use("/api/citations", CitationRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/audiobooks", AudioBookRouter);

const AudioLocalRouter = require("./router/audio-local.routes");
app.use("/api/local-audios", AudioLocalRouter);

//swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./docs/documentation.yml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


// 🧱 Error handler
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("✅ Server is running at port:", PORT);
});
