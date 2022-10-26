import clientPage from './ClientPage'

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
        selectFamily: () => cy.get("cdk-virtual-scroll-viewport table tbody td span"),
        codeResult: () => cy.get("table tbody tr td:nth-child(3) strong")
    }

    addArticle(data) {
        this.fillArticle(data)
            .each(($el, index, arr) => {
                arr.push($el.text().toLowerCase());
            }).then((arr) => {
                expect(arr.toArray()).includes(data.articleCode.toLowerCase());
            })
    }

    fillArticle(data) {
        clientPage.clickOnCreateBtn();
        this.articleType(data.type);
        this.elements.designationInput().type(data.productDescription);
        this.elements.expandItems().first().click();
        this.elements.selectItems().
            contains(data.measure, { matchCase: false }).click();
        this.elements.codeInput().type(data.articleCode);
        this.elements.montantInput().type(data.amount);
        this.elements.description().type(data.description);
        this.elements.articleFamily().type(data.articleFamily);
        this.elements.selectFamily().
            contains(data.articleFamily, { matchCase: false }).click();
        clientPage.saveModal();
        clientPage.searchItem(data.articleCode);
        return this.elements.codeResult();
    }

    getCode() {
        return this.elements.codeResult();
    }

    articleType(key) {
        switch (key) {
            case "produit":
                this.elements.articleType.productType().click();
                break;
            case "service":
                this.elements.articleType.serviceType().click();
                break;
            default:
                throw Error("Unknown article type.");
        }
    }
}

export default new ArticlesPage;

