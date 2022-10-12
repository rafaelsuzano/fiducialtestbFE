export default {

    particulier: () => {
        var name = `Test${Cypress._.random(0, 1e6)}`
        var surname = 'E2E';
        return {
            clientInfo: {
                clientType: 'particulier',
                greeting: 'madame',
                firstName: name,
                lastName: surname,
                email: 'fiducial@fiducial.net',
                firstPhone: '33-700-555-102',
                secondPhone: '33-655-525-489',
            },
            requiredInfo: {
                delay: '60 jours',
                clientCode: "12345678",
            },
            billingContact: {
                greeting: 'madame',
                name: 'Julie',
                surname: 'Billot',
                mobile: '0612345678',
                email: 'test@gmail.com',
                department: 'QA'
            },
            billingAddress: {
                number: '10',
                address: 'rue des mimosas',
                extention: 'IT',
                zipCode: '06000',
                city: 'Nice',
                country: 'france'
            },
            result: " "+`${name} ${surname}`+" "

        }
    }
}