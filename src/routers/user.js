const express = require("express"); // export express
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
// const User = require("")
const userRouter = express.Router(); // export express Router

// Get all pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    // extract loggedInUser
    const loggedInUser = req.user;
    // get all connectionm request of loggedInUser
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "about",
      "skills",
    ]);

    res.json({ message: "Data fetched Successfully...", connectionRequests });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    //get loggedInUsrer
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
        "skills",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
        "skills",
      ]);

    const data = connectionRequest.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
      }
      return row.fromUserId
    });

    res.json({ data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
