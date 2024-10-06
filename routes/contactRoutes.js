const express = require("express");
const router = express.Router();
const {getContacts , createContact, getContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:name").get(getContact).put(updateContact).delete(deleteContact);


module.exports=router;