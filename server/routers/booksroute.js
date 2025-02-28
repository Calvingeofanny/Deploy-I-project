const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const authorization = require("../middlewares/authorization");
const upload = require("../utils/multer");

router.post("/", authorization, BookController.create); // hanya admin yang bisa
router.get("/", BookController.read);
router.get("/:id", BookController.readOne);
router.put("/:id", authorization, BookController.update); // hanya admin yang bisa
router.delete("/:id", authorization, BookController.delete); // hanya admin yang bisa
router.patch("/:id", authorization, upload.single("file"), BookController.updateImage); // hanya admin yang bisa

module.exports = router;
