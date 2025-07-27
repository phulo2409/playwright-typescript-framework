import { faker } from '@faker-js/faker';

export class UserRandom {
    private name: string;
    private email: string;
    private title: string;
    private password: string;
    private day: string;
    private month: string;
    private year: string;
    private lastName: string;
    private company: string;
    private address1: string;
    private address2: string;
    private country: string;
    private state: string;
    private city: string;
    private zipcode: string;
    private mobileNumber: string;

    constructor() {
        this.name = faker.person.firstName();
        this.email = faker.internet.email();
        this.title = "Mr";
        this.password = "Test1234";
        this.day = "1";
        this.month = "January";
        this.year = "1980";
        this.lastName = faker.person.lastName();
        this.company = faker.company.name();
        this.address1 = faker.location.streetAddress();
        this.address2 = faker.location.streetAddress();
        this.country = "Canada"
        this.state = faker.location.state();
        this.city = faker.location.city();
        this.zipcode = faker.location.zipCode();
        this.mobileNumber = faker.phone.number();
    }

    getName(): string{
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }

    getTitle(): string{
        return this.title;
    }

    getPassword(): string{
        return this.password;
    }

    getDay(): string{
        return this.day;
    }

    getMonth(): string{
        return this.month;
    }

    getYear(): string{
        return this.year;
    }

    getLastName(): string{
        return this.lastName;
    }

    getCompany(): string{
        return this.company;
    }

    getAddress1(): string{
        return this.address1;
    }

    getAddress2(): string{
        return this.address2;
    }

    getCountry(): string{
        return this.country;
    }

    getState(): string{
        return this.state;
    }

    getCity(): string{
        return this.city;
    }

    getZipCode(): string{
        return this.zipcode;
    }

    getMobileNumber(): string{
        return this.mobileNumber;
    }
}