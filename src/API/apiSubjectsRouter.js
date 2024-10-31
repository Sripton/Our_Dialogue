import express from "express";
import { Subject, Direction } from "../db/models";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAllSubjects = await Subject.findAll();
    res.json(getAllSubjects);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getDirectionID = await Direction.findOne({
      where: { id },
    });
    const getAllSubject = await Subject.findAll({
      where: { direction_id: getDirectionID.id },
    });
    res.json(getAllSubject);
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  const allSubject = await Subject.findAll();
  res.send(allSubject)
})
export default router;
