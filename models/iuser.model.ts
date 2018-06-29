import { Document } from "mongoose";
// model of entity User
export interface IUserModel extends Document {
    name: string;
    address: string;
    phone: string;
    age: number;
    password: string;
    createdAt: Date;
    modifiedAt: Date;
}