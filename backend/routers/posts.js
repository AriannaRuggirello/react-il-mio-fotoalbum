const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const multer = require("multer");
const uploader = multer({dest: "public/img"});

router.get("/", postsController.index);
router.get('/:id', postsController.show);
router.post('/', uploader.single("image"), postsController.store);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.destroy);

module.exports = router;
