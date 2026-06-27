const mongoose = require("mongoose");
// connection request schema
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect Status type `,
      },
    },
  },
  {
    timestamps: true,
  },
);

// before actual saving it pre checks if the fromUser equals to toUser
connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this

  //  check if the fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send the connection request to yourSelf")
  }
  next()

})



// create model
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",     // model name
  connectionRequestSchema,// schema name
);
//  Export Model
module.exports = ConnectionRequestModel;
