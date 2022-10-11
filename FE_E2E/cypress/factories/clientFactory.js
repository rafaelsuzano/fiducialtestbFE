var faker = require('faker')

export default {

    registration: function() {
        faker.seed(123);        
        var data = {
            greeting: 'madame',
            firstName: 'Test ' + faker.datatype.number(),
            lastName: faker.name.lastName(),
            email: 'fiducial@fiducial.net',
            firstPhone: '33-700-555-102',
            secondPhone: '33-655-525-489',
            clientCode: "12345678",
            address: {

            }
        }

        return data;
    }
}