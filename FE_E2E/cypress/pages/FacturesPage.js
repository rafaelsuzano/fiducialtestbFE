class FacturesPage {

    elements = {
        searchClientInput: () => cy.get("fiducial-clients-selection input"),
        createNewClientBtn: () => cy.get("fiducial-create-new-entity-button button"),
        dropDownItems: () => cy.get("table tbody td span"),
        documentType: {
            factureSimple: () => cy.get("fiducial-invoice-type p-radiobutton[label*='simple'] div div:nth-child(2)"),
            factureAcompte: () => cy.get("fiducial-invoice-type p-radiobutton[label*='Acompte'] div div:nth-child(2)"),
            factureRecurrente: () => cy.get("fiducial-invoice-type p-radiobutton[label*='recurrente'] div div:nth-child(2)"),
            factureAvoir: () => cy.get("fiducial-invoice-type p-radiobutton[label*='recurrente'] div div:nth-child(2)")
        },
        devisAssocierInput: () => cy.get("fiducial-search-input:nth-child(3) input"),
        factureAssocierInput: () => cy.get("fiducial-invoice-selection-single fiducial-search-input input"),
        unitPriceInput: () => cy.get("fiducial-articles-line-item [class^='grid p-fluid'] div:nth-child(3) p-inputnumber"),
        envoyerBtn: () => cy.get("button[label='Envoyer']")
    }
}

export default new FacturesPage;