import clientPage from "../pages/ClientPage";
import articlesPage from "../pages/ArticlesPage";
import facturesPage from "../pages/FacturesPage";
import articleFactory from "../factories/ArticleFactory";
import clientFactory from "../factories/clientFactory";
import facturesFactory from "../factories/FacturesFactory";

describe('Warning message', () => {
    let clientName, articleCode;
    context('Given that user logins', () => {
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
                clientPage.addParticulierClient(client);
                clientName = client.clientInfo.firstName;
            })

            context('And article is created', () => {
                beforeEach(() => {
                    cy.accessMenu("Articles");
                    var article = articleFactory.article();
                    articlesPage.addArticle(article);
                    articleCode = article.articleCode;
                })

                context('And invoice is associated', () => {
                    beforeEach(() => {
                        cy.accessMenu("Factures");
                        var factory = facturesFactory.avoirWarning();
                        facturesPage.associateIncoice(clientName, articleCode)
                    })

                    context('When the unit price i greater tgha solde', () => {
                        it('Then it should warn the user', () => {
                            var factory = facturesFactory.avoirWarning();
                            facturesPage.validateWarningMessage(factory, clientName, articleCode);
                        })
                    })
                })
            })
        })
    })
})