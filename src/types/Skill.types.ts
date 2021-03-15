import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserSkill } from "./UserSkill.types";

@ObjectType() @Entity()
export class Skill extends BaseEntity {

    @Field(() => ID) @PrimaryGeneratedColumn()
    id: number; 

    @Field() @Column()
    name: String;

    @Field(() => Number)
    async frequency() {
        const skills = await UserSkill.count({
            where: { skillId: this.id }
        });
        return skills;
    }

    @OneToMany(() => UserSkill, userskill => userskill.skill)
    userConnection: UserSkill[]
}