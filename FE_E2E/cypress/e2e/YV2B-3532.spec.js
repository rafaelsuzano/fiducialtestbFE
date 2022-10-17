
//https://track.yesaccount.fr/issue/YV2B-3532

import addClientPage from '../pages/AddClientPage'
import clientFactory from '../factories/clientFactory'

describe('Add two clients', () => {

    context('Given that user successfully signed up', () => {
        beforeEach(() => {
            cy
                .fixture('data')
                .then(data => {
                    cy.login(data)
                        .invoke('text')
                        .should('eq', data.credential.loginPassed);
                })
        })

        context('User successfully adds a specific client', () => {
            it('Then client should be added successfully', () => {
                var data = clientFactory.particulier();
                cy.accessMenu("Clients");
                addClientPage.fillClientForm(data)
                    .each(($el, index, arr) => {
                        arr.push($el.text().toLowerCase());
                    }).then((arr) => {
                        expect(arr.toArray()).includes(data.expectedResult.toLowerCase())
                })
            })
        })
    })
})