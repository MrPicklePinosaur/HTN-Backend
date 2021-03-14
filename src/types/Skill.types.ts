import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserSkill } from "./UserSkill.types";

@ObjectType() @Entity()
export class Skill extends BaseEntity {

    @Field(() => ID) @PrimaryGeneratedColumn()
    id: number; 

    @Field() @Column()
    name: String;

    @ManyToOne(() => UserSkill, userskill => userskill.skill)
    userConnection: Promise<UserSkill[]>
}