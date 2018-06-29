// register mongoose library
import { model, Model } from "mongoose";
import Mongoose = require("mongoose");
import { IUserModel } from "./iuser.model";

// export is a keyword that makes a class/interface public
// tslint:disable-next-line:typedef
export const Schema = Mongoose.Schema;

// define the schema (field, validation) of entity User
let schema: Mongoose.Schema = new Schema({
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
}).pre("save", (next: any) => {
    // this will run before saving
    if (this._doc) {
        let doc: IUserModel = <IUserModel>this._doc;
        let now: Date = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});
// map user model to collection Users in mongoose database
export let UserSchema: Model<IUserModel> = model<IUserModel>("user", schema, "Users", true);