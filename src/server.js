import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jsxRender from "./Shablonizator/jsxRender";
import indexRouter from "./IndexRouter/indexRouter";
import path from "path";
import apiSubjects from "./API/apiSubjects";
import { Direction, Thumbnail } from "./db/models";
import session from "express-session";
import session__file__store from "session-file-store";
import apiUsers from "./API/apiUsers";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.engine("jsx", jsxRender);
app.set("view engine", "jsx");
app.set("views", path.join(__dirname, "components"));
const FileStore = session__file__store(session);
const sessionConfig = {
  name: "user_sid", // Имя куки для хранения id сессии. По умолчанию - connect.sid
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "dialog", // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session(sessionConfig));
app.use(async (req, res, next) => {
  try {
    const getDirections = await Direction.findAll();
    const getThumbnails = await Thumbnail.findAll();
    res.locals.directions = getDirections;
    res.locals.thumbnails = getThumbnails;
    res.locals.userID = req.session?.userID;
    res.locals.userName = req.session?.userName;
  } catch (error) {
    console.log(error);
  }
  res.locals.path = req.originalUrl;
  next();
});

app.use("/", indexRouter);
app.use("/api/subjects", apiSubjects);
app.use("/api/users", apiUsers);

app.listen(PORT, () => console.log(`***** Server start on ${PORT} port`));
