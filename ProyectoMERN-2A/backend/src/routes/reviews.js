import express from "express";

import ReviewsController from "../controllers/reviewcontrolller.js";
const router = express.Router();
router.route("/")
.get(ReviewsController.getreviews)
.post(ReviewsController.createreviews)
router.route("/:id")
.put(ReviewsController.updatereviews)
.delete(ReviewsController.deletereviews);



export default router;