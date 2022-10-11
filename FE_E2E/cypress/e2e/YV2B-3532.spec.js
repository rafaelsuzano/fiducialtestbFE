
//https://track.yesaccount.fr/issue/YV2B-3532

import loginPage from '../pages/LoginPage'
import registration from '../pages/RegistrationPage'


describe('Add two clients', () => {
    let data;
    context('Given that user has successfully signed up', () => {

        beforeEach(() => {
            cy
            .fixture('data')
            .then(x => {
                data = x
            })
        })

        context('User successfully adds a specific client', () => {
            it('Then client should be added successfully', () => {
                cy.login(data);
                cy.accessMenu("Clients");
                registration.clickOnCreateBtn();
                registration.selectClientType("particulier");
                registration.clickOnContinueBtn(); 
                registration.provideClienteInfo(data);
                registration.provideRequeredInfo(data);
            })


        })


    })
})