const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");

router.get("/", categoriesController.index);

router.get('/:id', categoriesController.show);

router.post('/', categoriesController.store);

router.put('/:id', categoriesController.update);

router.delete('/:id', categoriesController.destroy);


module.exports = router;