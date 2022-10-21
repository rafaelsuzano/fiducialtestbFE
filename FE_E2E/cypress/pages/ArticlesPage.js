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
        articleFamily: () => cy.get("fiducial-article-families-selection fiducial-search-input input")
    }
}

