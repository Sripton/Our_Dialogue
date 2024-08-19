import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jsxRender from "./Shablonizator/jsxRender";
import indexRouter from "./IndexRouter/indexRouter";
import path from "path";
import apiDirection from "./API/apiDirection";
import { Direction } from "./db/models";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.engine("jsx", jsxRender);
app.set("view engine", "jsx");
app.set("views", path.join(__dirname, "components"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(async (req, res, next) => {
  try {
    const getDirections = await Direction.findAll();
    res.locals.directions = getDirections;
  } catch (error) {
    console.log(error);
  }
  res.locals.path = req.originalUrl;
  next();
});

app.use("/", indexRouter);
app.use("/api/direction", apiDirection);

app.listen(PORT, () => console.log(`***** Server start on ${PORT} port`));
