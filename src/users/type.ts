export type UserDB = {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export type User = Omit<UserDB, 'id'>;
