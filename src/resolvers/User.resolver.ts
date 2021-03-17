import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../types/User.types';
import { IsEmail } from "class-validator";
import { Skill } from '../types/Skill.types';
import { NewSkillInput } from './Skill.resolver';
import { UserSkill } from '../types/UserSkill.types';

@InputType()
export class NewUserInput {

    @Field()
    name: String;

    @Field({ nullable: true })
    picture?: String;

    @Field({ nullable: true })
    company?: String;

    @Field()
    @IsEmail()
    email: String;

    @Field()
    phone: String;

    @Field(() => [NewSkillInput], { nullable: true })
    skills: NewSkillInput[];
}

@InputType()
export class UpdateUserInput {

    @Field({ nullable: true })
    picture?: String;

    @Field({ nullable: true })
    company?: String;

    @Field({ nullable: true })
    @IsEmail()
    email?: String;

    @Field({ nullable: true })
    phone?: String;

    @Field(() => [NewSkillInput], { nullable: true })
    skills?: NewSkillInput[];
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async getUsers(
        @Arg("id", { nullable: true }) id: number
    ): Promise<User[]> {

        let filtered = await User.find();

        if (id != null) filtered = filtered.filter(user => user.id === id);

        return filtered;
    }

    @Mutation(() => User)
    async newUser(
        @Arg("newdata", {}) newdata: NewUserInput
    ) {
        // check if email is registered
        let email = await User.findOne({ email: newdata.email });
        if (email != undefined) throw `Email ${newdata.email} has already been registered.`

        //
        const newUser = await User.create({
            name: newdata.name,
            picture: newdata.picture,
            company: newdata.company,
            email: newdata.email,
            phone: newdata.phone
        }).save();

        await linkSkills(newUser, (newdata.skills == null) ? [] : newdata.skills);
        return newUser;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("id", {}) id: number,
        @Arg("newdata", {}) newdata: UpdateUserInput
    ) {
        let updateUser = await User.findOneOrFail(id);

        // update skills
        if (newdata.skills != null) {
            await UserSkill.delete({ userId: updateUser.id });
            await linkSkills(updateUser, newdata.skills);
        }

        delete newdata.skills; //removes skills field
        const newUser = {...updateUser, ...newdata };
        await User.update(id, newUser);

        return newUser;
    }

}

// creates UserSkill objects, and also the skill if it didnt exist 
const linkSkills = async (user: User, skills: NewSkillInput[]) => {

    for (const skill of skills) {

        let linkedSkill = await Skill.findOne({ name: skill.name });
        if (linkedSkill == null) {
            // create skill if it doesn't exist
            linkedSkill = await Skill.create({ name: skill.name }).save();
        }

        //Create skill object
        await UserSkill.create({
            userId: user.id,
            skillId: linkedSkill.id,
            rating: skill.rating
        }).save();
    }

}