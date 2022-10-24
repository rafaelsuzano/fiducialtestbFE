import addClientPage from '../pages/AddClientPage'

class ArticlesPage {

    elements = {
        designationInput: () => cy.get("fiducial-input input"),
        articleType: {
            productType: () => cy.get("p-radiobutton:nth-child(1)"),
            serviceType: () => cy.get("p-radiobutton:nth-child(3)")
        },
        expandItems: () => cy.get("fiducial-article-form p-dropdown div:nth-child(3)"),
        selectItems: () => cy.get("p-dropdownitem li"),
        codeInput: () => cy.get("input[id='code']"),
        montantInput: () => cy.get("input[id='montant-ht']"),
        description: () => cy.get("[formcontrolname='description']"),
        articleFamily: () => cy.get("fiducial-article-families-selection fiducial-search-input input"),
        selectFamily: () => cy.get("#pr_id_20-table tbody td span")
    }

    addArticle(data) {
        addClientPage.clickOnCreateBtn();
        this.articleType(data.article.type);
        this.elements.designationInput().type(data.article.productDescription);
        this.elements.expandItems().click();
        this.elements.selectItems().
            contains(data.article.measure, { matchCase: false }).click();
        this.elements.codeInput().type(data.article.code);
        this.elements.montantInput().type(data.article.amount);
        this.elements.description().type(data.article.description);
        this.elements.articleFamily().click();
        this.elements.selectFamily().
            contains(data.article.articleFamily, { matchCase: false }).click();
        addClientPage.saveModal();
    }

    articleType(key) {
        switch (key) {
            case "produit":
                this.#elements.clientType.productType().click();
                break;
            case "service":
                this.#elements.clientType.serviceType().click();
                break;
            default:
                throw Error("Unknown article type.");
        }
    }
}

export default new ArticlesPage;

