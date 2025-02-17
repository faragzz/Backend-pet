import { Injectable } from '@nestjs/common';
import {User, UserDB} from "./type";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    private readonly users: UserDB[] = [
        {
            id: uuidv4(),
            username: 'John Doe',
            email: 'john@example.com',
            password: 'changeme',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        },
        {
            id: uuidv4(),
            username: 'Maria Smith',
            email: 'maria@example.com',
            password: 'guess',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        },
        {
            id: uuidv4(),
            username: 'Alice Brown',
            email: 'alice@example.com',
            password: 'securepass',
            role: 'moderator',
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        },
        {
            id: uuidv4(),
            username: 'Bob Johnson',
            email: 'bob@example.com',
            password: 'letmein',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        },
        {
            id: uuidv4(),
            username: 'Charlie Lee',
            email: 'charlie@example.com',
            password: 'charlie123',
            role: 'editor',
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        }
    ];
    async findOne(email: string): Promise<UserDB | null> {
        return this.users.find(user => user.email === email)??null;
    }

    async create(user: User): Promise<User> {
        const newUser: UserDB = {
            id: uuidv4(),
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
            refreshToken: 'refreshToken'
        };
        this.users.push(newUser);
        return newUser;
    }
    async updateRefreshToken(id: string, refreshToken: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);
        if (user) {
            user.refreshToken = refreshToken;
            return user;
        }
        return undefined;
    }

    async logout(userId: string) {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.refreshToken = null;
            return true;
        }
        return false;
    }
}
