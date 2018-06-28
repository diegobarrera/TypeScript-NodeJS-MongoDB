"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    create(item, callback) {
        this._model.create(item, callback);
    }
    retrieve(callback) {
        this._model.find({}, callback);
    }
    update(_id, item, callback) {
        this._model.update({ _id: _id }, item, callback);
    }
    delete(_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }
    findById(_id, callback) {
        this._model.findById(_id, callback);
    }
    findOne(cond, callback) {
        return this._model.findOne(cond, callback);
    }
    find(cond, fields, options, callback) {
        return this._model.find(cond, options, callback);
    }
    toObjectId(_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
exports.RepositoryBase = RepositoryBase;
//# sourceMappingURL=RepositoryBase.js.map