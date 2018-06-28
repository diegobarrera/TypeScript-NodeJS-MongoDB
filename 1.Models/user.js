"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose = require("mongoose");
exports.Schema = Mongoose.Schema;
let schema = new exports.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}).pre("save", (next) => {
    console.log(this._doc);
    if (this._doc) {
        let doc = this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});
exports.UserSchema = mongoose_1.model("user", schema, "Users", true);
//# sourceMappingURL=user.js.map