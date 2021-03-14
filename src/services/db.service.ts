import { createConnection } from 'typeorm';

import { User } from '../types/User.types';

/* fill db with some dummy data */
export const populateDB = async () => {

    User.insert({
        name: "billy",
        email: "billy@billy.com",
        phone: "911"
    });

    User.insert({
        name: "john",
        email: "john@john.com",
        phone: "911"
    });

}

export const initDB = async () => {

    const dbconnection = await createConnection();

    await dbconnection.dropDatabase();
    await dbconnection.synchronize();

    await populateDB();
    
}