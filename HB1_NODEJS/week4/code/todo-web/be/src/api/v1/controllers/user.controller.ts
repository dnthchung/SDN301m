import { NextFunction, Request, Response } from "express";
import { UserService } from "~/api/v1/services/user.service";
import { SuccessResponse } from "~/api/v1/utils/response.util";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email is required");
            }
            const user = await this.userService.login(email);
            new SuccessResponse("Login success", 200, user).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            new SuccessResponse("Get all users success", 200, users).send(res);
        } catch (error) {
            next(error);
        }
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            new SuccessResponse("Get user success", 200, user).send(res);
        } catch (error) {
            next(error);
        }
    };

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            new SuccessResponse("Create user success", 201, user).send(res);
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.updateUser(id, req.body);
            new SuccessResponse("Update user success", 200, user).send(res);
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            new SuccessResponse("Delete user success", 200).send(res);
        } catch (error) {
            next(error);
        }
    };
}
