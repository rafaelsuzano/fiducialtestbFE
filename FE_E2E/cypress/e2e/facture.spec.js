import clientPage from "../pages/ClientPage";
import articlesPage from "../pages/ArticlesPage";
import facturesPage from "../pages/FacturesPage";
import articleFactory from "../factories/ArticleFactory";
import clientFactory from "../factories/clientFactory";
import facturesFactory from "../factories/FacturesFactory";

describe('Facture', () => {

    context('Given that user adds incoices', () => {
        beforeEach(() => {
            cy
                .fixture('data')
                .then(data => {
                    cy.login(data)
                        .invoke('text')
                        .should('eq', data.credential.loginPassed);
                })              
        })

        context('And client is created', () => {
            beforeEach(() => {
                cy.accessMenu("Clients");
                var client = clientFactory.particulier();
                clientPage.addParticulierClient(client)
                .invoke('text').as('client')
            })

            context('And article is created', () => {
                beforeEach(() => {
                      cy.accessMenu("Articles");
                var article = articleFactory.article();
                articlesPage.fillArticle(article)
                    .invoke('text').as('article')
                })

                context('And invoice is associated', () => {
                    beforeEach(() => {
                          cy.accessMenu("Factures");
                    var article = articleFactory.article();
                    articlesPage.fillArticle(article)
                        
                    })
    
        context('When quote amout is less than the unit price', () => {
            it('Then it should warn the user', () => {                
                // cy.accessMenu("Clients");
                var client = clientFactory.particulier();
                // clientPage.addParticulierClient(client);
                //cy.accessMenu("Articles");
                var article = articleFactory.article();
                //articlesPage.addArticle(article);
                cy.accessMenu("Factures");
                var factory = facturesFactory.avoirWarning();
                debugger
                facturesPage.validateWarningMessage("TEST177", "E2E366", factory);

            })
        })
    })
})