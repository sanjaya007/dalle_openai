import express from "express";
import {
  getData,
  postData,
  editData,
  variationData,
} from "./controllers/controller.js";

const router = express.Router();

// get
router.get("/", getData);

// post
router.post("/get", postData);
router.post("/edit", editData);
router.post("/variation", variationData);

export default router;
