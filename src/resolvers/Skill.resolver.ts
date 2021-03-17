import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../types/Skill.types";

@InputType()
export class NewSkillInput {

    @Field()
    name: string

    @Field()
    rating: number
}

@Resolver()
export class SkillResolver {

    @Query(() => [Skill])
    async getSkills(
        @Arg("min_frequency", { nullable: true }) min_frequency: number,
        @Arg("max_frequency", { nullable: true }) max_frequency: number
    ) {
        let skills = await Skill.find();
        let filtered = [];

        // filter skills based on frequency
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