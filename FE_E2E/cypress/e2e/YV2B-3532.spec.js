
//https://track.yesaccount.fr/issue/YV2B-3532

import clientPage from '../pages/ClientPage'
import clientFactory from '../factories/clientFactory'

describe('Add two clients', () => {

    context('Given that user successfully signed up', () => {
        beforeEach(() => {
            cy
                .fixture('credentials')
                .then(x => {
                    cy.login(x)
                        .invoke('text')
                        .should('eq', x.credential.loginPassed);
                })
        })

        context('User successfully adds a specific client', () => {
            it('Then the particulier client should be added successfully', () => {
                var data = clientFactory.particulier();
                cy.accessMenu("Clients");
                clientPage.addParticulierClient(data);
                    
            })
        })

        // context('User successfully adds an entreprise client', () => {
        //     it('Then the entreprise client should be added successfully', () => {
        //         var data = clientFactory.entreprise();
        //         cy.accessMenu("Clients");
        //         clientPage.fillEntrepriseForm(data);
        //     })
        // })
    })
})