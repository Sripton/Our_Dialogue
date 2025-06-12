import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jsxRender from "./Shablonizator/jsxRender";
import indexRouter from "./IndexRouter/indexRouter";
import path from "path";
import apiSubjectsRouter from "./API/apiSubjectsRouter";
import { Direction, Thumbnail, Post } from "./db/models";
import session from "express-session";
import session__file__store from "session-file-store";
import apiUsersRouter from "./API/apiUsersRouter";
import apiPostRouter from "./API/apiPostsRouter";
import apiCommentsRouter from "./API/apiCommentsRouter";
import apiPostReactions from "./API/apiPostReactions";
import apiCommentReactions from "./API/apiCommentReactions";
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
    const allPosts = await Post.findAll();
    res.locals.directions = getDirections;
    res.locals.thumbnails = getThumbnails;
    res.locals.allPosts = allPosts;
    res.locals.userID = req.session?.userID;
    res.locals.userName = req.session?.userName;
  } catch (error) {
    console.log(error);
  }
  res.locals.path = req.originalUrl;
  next();
});

app.use("/", indexRouter);
app.use("/api/subjects", apiSubjectsRouter);
app.use("/api/users", apiUsersRouter);
app.use("/api/posts", apiPostRouter);
app.use("/api/postreactions", apiPostReactions);
app.use("/api/comments", apiCommentsRouter);
app.use("/api/likeordislikecomment", apiCommentReactions);

app.listen(PORT, () => console.log(`***** Server start on ${PORT} port`));
