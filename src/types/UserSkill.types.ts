import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Skill } from "./Skill.types";
import { User } from "./User.types";

@ObjectType() @Entity()
export class UserSkill extends BaseEntity {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    skillId: number;

    @ManyToOne(() => User, user => user.skillConnection, { primary: true }) @JoinColumn({ name: "userId" })
    user: Promise<User>;

    @OneToMany(() => Skill, skill => skill.userConnection, { primary: true }) @JoinColumn({ name: "skillId"})
    skill: Promise<Skill>;

    @Field() @Column()
    rating: number;
}