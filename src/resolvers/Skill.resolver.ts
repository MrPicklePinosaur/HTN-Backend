import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root } from "type-graphql";
import { createQueryBuilder, getConnection, LessThanOrEqual } from "typeorm";
import { Skill } from "../types/Skill.types";
import { UserSkill } from "../types/UserSkill.types";

@InputType()
export class NewSkillInput {

    @Field()
    name: string

    @Field()
    rating: number
}

@Resolver(of => Skill)
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills(
        @Arg("min_frequency", { nullable: true }) min_frequency: number,
        @Arg("max_frequency", { nullable: true }) max_frequency: number
    ) {
        // if (min_frequency == null) min_frequency = 0;
        // if (max_frequency == null) max_frequency = 99;

        // const skills = await createQueryBuilder(Skill, "skill")
        //     .select("skill")
        //     .where("skill.frequency >= :min_frequency AND skill.frequency <= :max_frequency", { min_frequency, max_frequency })
        //     .execute();
        // console.log(skills);
        // let skills = await Skill.find({
        //    where: {
        //        frequency: LessThanOrEqual(max_frequency),
        //    } 
        // })
        let skills = await Skill.find();
        let filtered = [];
        for (const skill of skills) {
            const freq = await skill.frequency();
            var insert = true;
            if (min_frequency != undefined) {
                if (freq < min_frequency) insert = false;
            }
            if (max_frequency != undefined) {
                if (freq > max_frequency) insert = false;
            }
            if (insert) filtered.push(skill);
        }

        return filtered;
    }

    @Mutation(() => Skill)
    async newSkill(
        @Arg("name", {}) name: String
    ) {
        return Skill.create({ name: name }).save();
    }
}