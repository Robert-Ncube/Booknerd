import express from "express";
import {
  addFavourate,
  deleteFavourate,
  getAllFavouratesByUserId,
} from "../controllers/FavouratesController.js";

const router = express.Router();

router.get("/:id", getAllFavouratesByUserId);
router.post("/add", addFavourate);
router.delete("/delete/:id/:bookId", deleteFavourate);

export default router;
