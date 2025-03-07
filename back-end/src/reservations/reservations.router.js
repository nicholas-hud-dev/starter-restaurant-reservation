const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:reservation_id/:reservation_option')
        .put(controller.update)
        .all(methodNotAllowed)

router.route('/').
        post(controller.create)
        .get(controller.list)
        .all(methodNotAllowed)

router.route('/:reservation_id')
        .get(controller.read)
        .put(controller.update)
        .all(methodNotAllowed);

module.exports = router;
