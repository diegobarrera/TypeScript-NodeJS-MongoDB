import "jasmine";
import { UserService, IUserService } from "./userService";
import { UserRepository } from "../2.Repositories/userRepository";
import { IUserModel } from "../1.Models/user";

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
        service.createUser(user).then(() => {

        });
        // expect(service.createUser(user)).toBe(true);
    });
});