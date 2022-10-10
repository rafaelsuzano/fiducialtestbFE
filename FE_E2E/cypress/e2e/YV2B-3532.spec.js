import loginPage from '../pages/LoginPage'

describe('Add two clients', () => {
    context('Given that user has successfully signed up', () => {
        beforeEach(() => {
            loginPage.visit();
            loginPage.login();
        })

        context('User successfully adds a specific client', () => {
            it('Then client should be added successfully', () => {
                cy.accessMenu("Clients");
            })

         
        })

   
    })
})