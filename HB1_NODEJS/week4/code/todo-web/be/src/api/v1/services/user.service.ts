import { IUser } from "~/api/v1/types/user.type";
import { UserRepository } from "~/api/v1/repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(email: string): Promise<IUser> {
        let user = await this.userRepository.findByEmail(email);
        if (!user) {
            user = await this.userRepository.createUser({ email });
        }
        return user;
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await this.userRepository.getUserById(id);
    }

    async createUser(data: Partial<IUser>): Promise<IUser> {
        return await this.userRepository.createUser(data);
    }

    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await this.userRepository.deleteUser(id);
    }
}
