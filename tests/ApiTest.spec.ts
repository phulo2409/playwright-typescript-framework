import { UserRandom } from '../data/UserRandom';
import {test,expect} from '../fixtures/BaseTest';
import { ApiHelper } from '../utils/ApiHelper';

test.describe('API tests - @regression @api', () =>{
    test.describe.configure({mode: 'default'});
    const user = new UserRandom();

    test('Create/Register User Account', async()=>{
        const response:any = await ApiHelper.createUser(user)
        // console.log("Email:" + user.getEmail() + 
        // " \n Password:" + user.getPassword() + 
        // " \n First Name:" + user.getName() +
        // " \n Last Name:" + user.getLastName() +
        // " \n Address1:" + user.getAddress1() +
        // " \n Address2:" + user.getAddress2() +
        // " \n City:" + user.getCity() +
        // " \n Company:" + user.getCompany() +
        // " \n State:" + user.getState() +
        // " \n Phone:" + user.getMobileNumber() +
        // " \n Country:" + user.getCountry() +
        // " \n PostCode:" + user.getZipCode());
        expect(response.responseCode).toEqual(201);
        expect(response.message).toBe("User created!");
    });

    test('Verify Login with valid details', async()=>{
        const response:any = await ApiHelper.verifyLogin(user)
        expect(response.responseCode).toEqual(200);
        expect(response.message).toBe("User exists!");
    });

    test('GET user account detail by email', async()=>{
        const response:any = await ApiHelper.getUserDetailByEmail(user)
        expect(response.responseCode).toEqual(200);
    });

    test('DELETE METHOD To Delete User Account', async()=>{
        const response:any = await ApiHelper.deleteAccount(user)
        expect(response.responseCode).toEqual(200);
        expect(response.message).toBe("Account deleted!");
    });    
});
