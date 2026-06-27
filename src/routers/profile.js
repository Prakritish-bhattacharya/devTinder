const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

// Profile view Route
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("No User Found !!!");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// profile route
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request !!!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // save user
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully...`,
      data: loggedInUser,
    });
  } catch (error) {
    res
      .status(400)
      .send("Encounting Error in profile edit !!!" + error.message);
  }
});


module.exports = profileRouter;
