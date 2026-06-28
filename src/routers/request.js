const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();

//  connection request API
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // status type validation
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type " + status });
      }

      // check User is exists in DB or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("User not found !!!");
      }

      // both side connection request validation
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send(
            `${existingConnectionRequest.fromUserId} already send you a connection request`,
          );
      }

      // create new Instance of Model
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      // save it to connectionRequestModel
      const data = await connectionRequest.save();
      // send back response to client
      res.send({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send(
          "Something went cooked 💀 when Send Connection request" +
            error.message,
        );
    }
  },
);

// accept or reject API
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      //---first we need to check , status is exists
      const loggedInUser = req.user; // get the user which save in our cookie
      const { status, requestId } = req.params; // extract status and requestId from req.params--means come through URL

      // set status for endUser who accept or reject the request
      const allowedStatus = ["accepted", "rejected"];
      // check the condition if status are includes then proceed next task otherwise return back with 400 ststus error
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed !!!" });
      }
      /**
       * check all corner cases-- which have highly chance to appear
       * 1) loggedInId == toUser
       * 2) status = interested
       * 3) request id should be valid/exists in DB
       */
      const connectionRequest = await ConnectionRequestModel.findById({
        _id: requestId, // 3) request id should be valid/exists in DB
        toUserId: loggedInUser._id, //1) loggedInId == toUser
        status: "interested", //2) status = interested
      });
      // if connection request not found then throw the error
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found !!!" });
      }

      // pussing the status which is coming from params
      connectionRequest.status = status;
      // save the data
      const data = await connectionRequest.save();

      // send response back
      res.send({ message: "Connection request " + status, data });
    } catch (error) {
      console.log(error);
      res.status(400).send("ERROR: " + error.message);
    }
  },
);

// Export it
module.exports = requestRouter;
