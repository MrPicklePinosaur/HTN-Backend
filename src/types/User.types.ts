import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, OneToMany } from 'typeorm';
import { UserSkill } from "./UserSkill.types";

@ObjectType() @Entity()
export class User extends BaseEntity {

    @Field(() => ID) @PrimaryGeneratedColumn()
    id: number;

    @Field() @Column()
    name: String;

    @Field({ nullable: true }) @Column({ nullable: true })
    picture?: String;

    @Field({ nullable: true }) @Column({ nullable: true })
    company?: String;

    @Field() @Column()
    email: String;

    @Field() @Column()
    phone: String;

    @OneToMany(() => UserSkill, userskill => userskill.user)
    skillConnection: Promise<UserSkill[]>;

    // @Field(() => [Skill])
}
