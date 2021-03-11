import { createConnection } from 'typeorm';

import { User } from '../types/User.types';

/* fill db with some dummy data */
export const populateDB = async () => {

    const billy = new User();
    billy.name = "billy";
    billy.email = "billy@billy.com";
    billy.phone = "911";
    billy.save();

}

export const initDB = async () => {
    const dbconnection = await createConnection();

    await dbconnection.dropDatabase();
    await dbconnection.synchronize();

    await populateDB();
    
}