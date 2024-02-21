const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { //figure out how to hash this
        type: String,
        required: true
    }
});

export default mongoose.models.EmployeeSchema || mongoose.model('Employee', EmployeeSchema)