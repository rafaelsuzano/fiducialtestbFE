import clientPage from "../pages/ClientPage";
import articlesPage from "../pages/ArticlesPage";

describe('test', () => {
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

        context('And load data', () => {
            beforeEach(() => {
                cy.fixture('clients').as('clients')
                cy.fixture('articles').as('articles')
            })

            context('And client is created', () => {
                beforeEach(function () {
                    cy.accessMenu("Clients");
                    clientPage.addClient(this.clients);
                })

                context('And article is created', () => {
                    beforeEach(function () {
                        debugger
                        cy.accessMenu("Articles");
                        articlesPage.addArticle(this.articles.properties.regression);
                    })

                    context('When the article unit price is greater than solde', () => {
                        it('Then it should warn the user', function () {
                            const user = this.clients;
                            debugger
                            console.log(user)
                        })
                    })
                })
            })
        })
    })
})