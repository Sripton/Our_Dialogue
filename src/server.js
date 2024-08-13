import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jsxRender from "./Shablonizator/jsxRender";
import indexRouter from "./IndexRouter/indexRouter";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.engine("jsx", jsxRender);
app.set("view engine", "jsx");
app.set("views", path.join(__dirname, "components"));

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  res.locals.path = req.originalUrl;
  next();
});

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`***** Server start on ${PORT} port`));
