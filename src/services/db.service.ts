import { createConnection, getConnection } from 'typeorm';
import { Skill } from '../types/Skill.types';

import { User } from '../types/User.types';
import { UserSkill } from '../types/UserSkill.types';

import hackerData from '../database/hacker-data-2021.json'

// fill db with some dummy data - small test set
export const populateDB = async () => {

    User.create({
        name: "billy",
        email: "billy@billy.com",
        phone: "911",
        skills: []
    }).save();

    User.create({
        name: "john",
        email: "john@john.com",
        phone: "911",
        skills: []
    }).save();

    Skill.create({
        name: "python"
    }).save();

    Skill.create({
        name: "java"
    }).save();

    UserSkill.create({
        userId: 1,
        skillId: 1,
        rating: 10
    }).save();

}

// fill database with the real testing set
export const bigPopulateDb = async () => {

    const dbconnection = getConnection();
    await dbconnection.dropDatabase();
    await dbconnection.synchronize();

    for (const userData of hackerData) {
        var newUser = await new User();
        newUser.name = userData.name;
        newUser.email = userData.email;
        newUser.phone = userData.phone;
        await newUser.save();

        for (const skill of userData.skills) {
            var findSkill = await Skill.findOne({ name: skill.name });

            if (findSkill == null) {
                var newSkill = await new Skill();
                newSkill.name = skill.name;
                findSkill = await newSkill.save();
            }

            var newUserSkill = await new UserSkill();
            newUserSkill.userId = newUser.id;
            newUserSkill.skillId = findSkill.id;
            newUserSkill.rating = skill.rating;
            await newUserSkill.save();
        }
    }

}

export const initDB = async () => {

    await createConnection();
    await bigPopulateDb();

}
