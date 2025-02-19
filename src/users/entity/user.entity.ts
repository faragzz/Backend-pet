// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import {ObjectIdColumn} from "typeorm/browser";
// import {ObjectId} from "mongodb";
//
// type Role = 'admin' | 'user';
//
// @Entity()
// export class User {
//     @ObjectIdColumn()
//     _id: ObjectId;
//
//     @Column()
//     username: string;
//
//     @Column({ unique: true })
//     email: string;
//
//     @Column()
//     password: string;
//
//     @Column({ default: 'user' })
//     role: Role;
//
//     @Column({ nullable: true })
//     refreshToken: string | null;
//
//     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date;
//
//     @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
//     updatedAt: Date;
// }
