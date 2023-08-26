const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
        .get(controller.list)
        .post(controller.create)
        .all(methodNotAllowed)

router.route("/:tableId([0-9]+)")

router.route("/:tableId([0-9]+)/seat")

        

module.exports = router;
