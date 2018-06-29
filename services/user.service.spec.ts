import "jasmine";
import { UserService } from "./user.service";
import { UserRepository } from "../repositories/user.repository";
import { IUserModel } from "../models/iuser.model";
import { IUserService } from "./iuser.service";

describe("something", () => {
    it("should work", () => {
        let repo: UserRepository = new UserRepository();
        let service: IUserService = new UserService(repo);
        let user: IUserModel = <IUserModel>{
            name: "test",
            age: 12,
            address: "address",
            phone: "user.phone",
        };
        service.createUser(user).then(() => { });
        // expect(service.createUser(user)).toBe(true);
    });
});