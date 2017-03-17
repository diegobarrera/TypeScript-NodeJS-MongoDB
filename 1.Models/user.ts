// register mongoose library
import mongoose = require("mongoose");

// export is a keyword that makes a class/interface public
export let Schema = mongoose.Schema;

// model of entity User
export interface IUserModel extends mongoose.Document {
    name: string;
    address: string;
    phone: string;
    age: number;
    createdAt: Date;
    modifiedAt: Date;
}

// define the schema (field, validation) of entity User
let schema = new Schema({
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
}).pre('save', function (next) {
    // this will run before saving
    if (this._doc) {
        let doc = <IUserModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

// map user model to collection Users in mongoose database
export let UserSchema = mongoose.model<IUserModel>('user', schema, 'Users', true);