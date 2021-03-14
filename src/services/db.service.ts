import { createConnection } from 'typeorm';
import { Skill } from '../types/Skill.types';

import { User } from '../types/User.types';
import { UserSkill } from '../types/UserSkill.types';

/* fill db with some dummy data */
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

}

export const initDB = async () => {

    const dbconnection = await createConnection();

    await dbconnection.dropDatabase();
    await dbconnection.synchronize();

    await populateDB();
    
}