const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id is requires"],
        ref: "User"
    },
    name : {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email : {
        type: String,
        required: [true, "Please add the email address"]
    },
    phone : {
        type: String,
        required: [true, "Please add the contact phone number"]
    }
},{
    timestamps: true
}
);
module.exports = mongoose.model("Contact", contactSchema)