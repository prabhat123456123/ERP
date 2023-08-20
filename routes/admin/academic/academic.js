const express = require("express");
const router = express.Router();
const {isAuthenticatedUser} = require("../../../helper/auth");

 
const {
 admitCard
} = require("../../../controller/admin");

router.get("/admit-card", admitCard);


module.exports = router;
