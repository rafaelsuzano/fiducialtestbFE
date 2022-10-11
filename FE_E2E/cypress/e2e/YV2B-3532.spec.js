
//https://track.yesaccount.fr/issue/YV2B-3532

import registration from '../pages/RegistrationPage'
import clientFactory from '../factories/clientFactory'


describe('Add two clients', () => {

    context('Given that user successfully signed up', () => {

        beforeEach(() => {
            cy
            .fixture('data')
            .then(x => {
                cy.login(x);
            })
        })

        context('User successfully adds a specific client', () => {
            it('Then client should be added successfully', () => {
                var clientData = clientFactory.registration();                
                cy.accessMenu("Clients");
                registration.clickOnCreateBtn();
                registration.selectClientType("particulier");
                registration.clickOnContinueBtn(); 
                registration.provideClienteInfo(clientData);
                registration.provideRequeredInfo(clientData);
            })


        })


    })
})