const express = require("express");
const router = express.Router();

 
const {
 admitCard
} = require("../../../controller/admin");

router.get("/admit-card", admitCard);


module.exports = router;
