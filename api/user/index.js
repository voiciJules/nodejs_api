// routing

const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "beck" },
  { id: 3, name: "chris" },
];

router.get("/", ctrl.index);

router.get("/:id", ctrl.show);

router.delete("/:id", ctrl.destroy);

router.post("/", ctrl.create);

router.put("/:id", ctrl.update);

module.exports = router;
