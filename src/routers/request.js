const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
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
      const allowedStatus = ["ignored", "interested"]
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status type " +  status})
      }


      // check User is exists in DB or not
      const toUser = await User.findById(toUserId)
      if(!toUser){
        return res.status(404).send("User not found !!!")
      }


      // both side connection request validation
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })
      if(existingConnectionRequest){
        return res.status(400).send(`${existingConnectionRequest.fromUserId} already send you a connection request`)
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
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
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


module.exports = requestRouter;
