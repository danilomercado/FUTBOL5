const express = require("express");
const router = express.Router();

const { getUsers, updateUserRole } = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// solo admin y sysadmin pueden ver usuarios
router.get("/", authMiddleware, roleMiddleware("ADMIN", "SYSADMIN"), getUsers);

// solo sysadmin puede cambiar roles
router.patch(
  "/:id/role",
  authMiddleware,
  roleMiddleware("SYSADMIN"),
  updateUserRole,
);

module.exports = router;
