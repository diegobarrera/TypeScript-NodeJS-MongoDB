import "jasmine";
import { UserService } from "./user.service";
import { IUserModel } from "../models/iuser.model";
import { IUserService } from "./iuser.service";
import { UserRepositoryMock } from "../services-mock/user.repository.mock";
import { BaseRepository } from "../repositories/base.repository";

describe("something", () => {
    it("should work", () => {
        let repo: BaseRepository<IUserModel> = new UserRepositoryMock();
        let service: IUserService = new UserService(repo);
        let user: IUserModel = <IUserModel>{
            name: "test",
            age: 12,
            address: "address",
            phone: "user.phone",
        };
        service.createUser(user).then(result => {
            expect(result).toBe(false);
        });
    });
});