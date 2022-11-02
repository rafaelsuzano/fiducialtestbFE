//https://track.yesaccount.fr/issue/YV2B-3768

import articlesPage from "../pages/ArticlesPage";
import articleFactory from "../factories/ArticleFactory";

describe('Add article randomly', () => {

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
        context('User successfully adds an article', () => {
            it('Then the article should be added successfully', () => {
                cy.accessMenu("Articles");
                    var article = articleFactory.article();
                    articlesPage.addArticle(article.regression);
            })
        });
    });
});
