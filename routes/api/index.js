const router = require("express").Router();
const userRoutes =require("./userRoutes");
const thoughtsRoutes =require("./thoughtsRoutes");


router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);
// router.use((req, res) => res.send("wrong route!"));

module.exports = router;