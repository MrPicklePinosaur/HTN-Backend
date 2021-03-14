import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './types/User.types';
import { IsEmail } from "class-validator";
import { Skill } from './types/Skill.types';

@InputType()
class NewUserInput {

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
}

@InputType()
class UpdateUserInput implements Partial<User> {

    @Field({ nullable: true })
    picture?: String;

    @Field({ nullable: true })
    company?: String;

    @Field({ nullable: true })
    @IsEmail()
    email: String;

    @Field({ nullable: true })
    phone: String;
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async getUsers (
        @Arg("id", { nullable: true }) id: number
    ): Promise<User[]> {

        let filtered = await User.find();

        if (id != null) filtered = filtered.filter(user => user.id === id);

        return filtered;
    }

    @Mutation(() => User)
    async newUser (
        @Arg("newdata", {}) newdata: NewUserInput
    ) {

        // check if email is registered
        let email = await User.findOne({ email: newdata.email });
        if (email != undefined) throw `Email ${newdata.email} has already been registered.`

        User.insert(newdata);
        return newdata;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg("id", {}) id: number,
        @Arg('newdata', {}) newdata: UpdateUserInput
    ) {

        let updateUser = await User.findOneOrFail(id);
        // if (updateUser == undefined) throw `User with ID ${id} not found.`;

        const newUser = {...updateUser, ...newdata};
        User.update(id, newUser);

        return newUser;
    }

}