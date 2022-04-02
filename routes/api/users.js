const router = require("express").Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/usercontrollers");

//example endpoint: /api/users
router.route("/").get(getAllUsers).post(createUser);
//example endpoint: /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteFriend);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
