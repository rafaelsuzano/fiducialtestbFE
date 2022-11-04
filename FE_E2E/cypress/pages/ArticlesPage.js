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
        selectFamily: () => cy.get("cdk-virtual-scroll-viewport table tbody span"),
        codeResult: () => cy.get("table tbody tr:nth-child(1) td:nth-child(3) strong"),
        entity: {
            createBtn: () => cy.get("fiducial-create-new-entity-button button"),
            name: () => cy.get("input[id='name']"),
            saveBtn: () => cy.get("button[label='Ajouter']")
        }
    }

    addArticle(data) {
        this.fillArticle(data);
    }

    fillArticle(data) {
        let type, productDescription, measure, articleCode, amount, description, articleFamily
        var index = Math.floor(Math.random() * data.products.length);
        type = data.type[index];
        productDescription = data.products[index];
        measure = data.measure;
        articleCode = data.articleCode[index];
        amount = data.amount[index];
        description = data.description
        articleFamily = data.articleFamily[index]

        debugger
        let found = false;
        clientPage.searchItem(articleCode);
        cy.wait(1000);
        debugger
        this.elements.codeResult().then(($el) => {
            let text = $el.text().toLowerCase().trim();
            debugger
            if (text === articleCode.toLowerCase()) {
                found = true;
                debugger
                expect(text).to.equals(articleCode.toLowerCase())
            }
        }).then(() => {
            if (!found) {
                debugger
                clientPage.clickOnCreateBtn();
                this.articleType(type);
                this.elements.designationInput().type(productDescription);
                this.elements.expandItems().first().click();
                this.elements.selectItems().
                    contains(measure, { matchCase: false }).click();
                this.elements.codeInput().type(articleCode);
                this.elements.montantInput().clear().type(amount);
                this.elements.description().type(description);
                this.elements.articleFamily().type(articleFamily);
                this.selectFamily(articleFamily);
                clientPage.saveModal();
                clientPage.searchItem(articleCode);
                this.elements.codeResult()
                    .should('be.visible')
                    .and('have.text', articleCode);
            }
        })
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
                throw Error(`Unknown ${key} type.`);
        }
    }

    selectFamily(articleFamily) {
        let found = false
        this.elements.selectFamily().each(($el, i) => {
            i++;
            const item = `cdk-virtual-scroll-viewport table tbody tr:nth-child(${i})`;
            if ($el.text().toLowerCase().trim() === articleFamily.toLowerCase()) {
                cy.get(item).click();
                found = true;
            }
        }).then(() => {
            if (!found) {
                this.createFamilyEntite(articleFamily)
            }
        })
    }

    createFamilyEntite(entity) {
        this.elements.entity.createBtn().click();
        this.elements.entity.name().type(entity);
        this.elements.entity.saveBtn().click();
    }
}

export default new ArticlesPage;


