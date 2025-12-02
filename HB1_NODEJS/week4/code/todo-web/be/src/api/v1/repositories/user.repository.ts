import { User } from "~/api/v1/models/user.model";
import { IUser } from "~/api/v1/types/user.type";

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async createUser(data: Partial<IUser>): Promise<IUser> {
        return await User.create(data);
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async findAll(): Promise<IUser[]> {
        return await User.find();
    }

    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }
}
