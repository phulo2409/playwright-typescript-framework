import { request } from '@playwright/test';
import { UserRandom } from '../data/UserRandom';

export class ApiHelper{
    static async createUser(user: UserRandom){
        const apiContext = await request.newContext();

        const formData = new URLSearchParams();
        formData.append('name', user.getName());
        formData.append('email', user.getEmail());
        formData.append('password', user.getPassword());
        formData.append('title', user.getTitle());
        formData.append('birth_date', user.getDay());
        formData.append('birth_month', user.getMonth());
        formData.append('birth_year', user.getYear());
        formData.append('firstname', user.getName());
        formData.append('lastname', user.getLastName());
        formData.append('company', user.getCompany());
        formData.append('address1', user.getAddress1());
        formData.append('address2', user.getAddress2());
        formData.append('country', user.getCountry());
        formData.append('zipcode', user.getZipCode());
        formData.append('state', user.getState());
        formData.append('city', user.getCity());
        formData.append('mobile_number', user.getMobileNumber());


        const response = await apiContext.post("/api/createAccount", 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData.toString(),

        });

        // if (response.status() !== 201){
        //     throw new Error(`User creation failed: ${response.status()}`);
        // }

        const body = await response.json();

        if(body.responseCode !== 201){
            throw new Error(`User creation failed: ${body.responseCode}`);
        }
        
        return body;
    }

    static async verifyLogin(user: UserRandom){
        const apiContext = await request.newContext();

        const formData = new URLSearchParams();
        formData.append('email', user.getEmail());
        formData.append('password', user.getPassword());

        const response = await apiContext.post("/api/verifyLogin", 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData.toString(),

        });
        const body = await response.json();
        return body;

    }

    static async getUserDetailByEmail(user: UserRandom){
        const apiContext = await request.newContext();
        const response = await apiContext.get(`/api/getUserDetailByEmail?email=${user.getEmail()}`);
        const body = await response.json();
        return body;
    }

    static async deleteAccount(user: UserRandom){
        const apiContext = await request.newContext();

        const formData = new URLSearchParams();
        formData.append('email', user.getEmail());
        formData.append('password', user.getPassword());

        const response = await apiContext.delete("/api/deleteAccount", 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData.toString(),

        });
        const body = await response.json();
        return body;

    }



}