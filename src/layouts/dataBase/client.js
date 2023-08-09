const mongoose = require("mongoose")

const client = mongoose.model('client', {
    name: String,
    email: String,
    phoneNumber: Number
})

module.exports = client