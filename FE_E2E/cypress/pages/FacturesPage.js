import loginPage from './LoginPage';

class FacturesPage {

    elements = {
        createBtn: () => cy.get("button[label='Créer']"),
        searchClientInput: () => cy.get("fiducial-clients-selection input"),
        createNewClientBtn: () => cy.get("fiducial-create-new-entity-button button"),
        dropDownItems: () => cy.get("cdk-virtual-scroll-viewport table tbody td span"),
        documentType: {
            factureSimple: () => cy.get("fiducial-invoice-type p-radiobutton[label*='simple'] div div:nth-child(2)"),
            factureAcompte: () => cy.get("fiducial-invoice-type p-radiobutton[label*='Acompte'] div div:nth-child(2)"),
            factureRecurrente: () => cy.get("fiducial-invoice-type p-radiobutton[label*='recurrente'] div div:nth-child(2)"),
            factureAvoir: () => cy.get("fiducial-invoice-type p-radiobutton[label*='Avoir'] div div:nth-child(2)")
        },
        objetInput: () => cy.get('fiducial-document-info-avoir input'),
        devisAssocierInput: () => cy.get("fiducial-search-input:nth-child(3) input"),
        devisAssocierItems: () => cy.get("p-table cdk-virtual-scroll-viewport table tbody td strong"),
        articleAssocierInput: () => cy.get("fiducial-search-input:nth-child(2) input"),
        selectArticle: () => cy.get("cdk-virtual-scroll-viewport table tbody td span"),
        articleCodeLabel: () => cy.get("fiducial-articles-line-item input:nth-child(2)"),
        factureAssocierInput: () => cy.get("fiducial-invoice-selection-single fiducial-search-input input"),
        invoicesTableResult: () => cy.get("fiducial-associated-invoices-list table tbody tr td strong"),
        unitPriceInput: () => cy.get("[class^='grid p-fluid'] div:nth-child(3) span input"),
        envoyerBtn: () => cy.get("button[label='Envoyer']"),
        submitBtn: () => cy.get("button[label='Suivant']"),
        sendDocumentDropdown: () => cy.get("fiducial-pop-up-window-wrapper span:nth-child(2)"),
        sendDropdownItems: () => cy.get("ul[class^='p-dropdown-items'] li span"),
        printDocumentBtn: () => cy.get("button[label='Imprimer']"),
        closeMessageBtn: () => cy.get("[class^='p-toast-icon-close']")
    }

    validateWarningMessage(data, client, article) {
        cy.wait(2500);
        this.elements.createBtn().click({ force: true });
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().first().click({ force: true });
        this.documentType(data.documentType);
        this.elements.devisAssocierInput().scrollIntoView().click({ force: true });
        this.elements.devisAssocierItems().first().click({ force: true });
        this.elements.unitPriceInput().clear().type(data.amount);
        this.elements.envoyerBtn().click({ force: true });
        loginPage.getDetailMessage()
            .invoke('text')
            .should('eq', data.expectedWarningMessage);
    }

    validateInvoice(data, client){
        cy.wait(2500);
        this.elements.createBtn().click({ force: true });
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().first().click({ force: true });
        this.documentType(data.documentType);
        this.elements.objetInput().type(data.goal)
        this.elements.devisAssocierInput().click({ force: true });
        this.elements.devisAssocierItems().first().click({ force: true });
        // this.elements.unitPriceInput().clear().type(data.amount);
        //this.elements.envoyerBtn().click({ force: true });
    }

    associateInvoice(client, code) {
        this.elements.createBtn().click({ force: true });
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().first().scrollIntoView().click({ force: true });
        this.elements.articleAssocierInput().last().type(code);
        this.elements.dropDownItems().first().click({ force: true });
        this.elements.articleCodeLabel().first().should('be.visible');
        this.envoyerModal();
    }

    envoyerModal() {
        this.elements.envoyerBtn().click();
        this.elements.submitBtn().click();
        cy.get("fiducial-pop-up-window-wrapper [label='Envoyer']").click();
    }

    documentType(key) {
        switch (key) {
            case "simple":
                this.elements.documentType.factureSimple().click();
                break;
            case "acompte":
                this.elements.documentType.factureAcompte().click();
                break;
            case "recurrent":
                this.elements.documentType.factureRecurrente().click();
                break;
            case "avoir":
                this.elements.documentType.factureAvoir().click();
                break;
            default:
                throw Error("Unknown document type.");
        }
    }

    validateInvoiceResult(artice) {
        this.elements.invoicesTableResult()
            .each(($el, index, arr) => {
                arr.push($el.text().toLowerCase());
            }).then((arr) => {
                expect(arr.toArray()).includes(artice.toLowerCase())
            })
    }

    selectDropdownItem(typeElement, elements, select, targetWord){
        debugger
        typeElement.scrollIntoView().type(targetWord);        
        let found = false
        elements.each(($el, i) => {
            i++;
            if ($el.text().toLowerCase().trim() === targetWord.toLowerCase()) {
                cy.get(`${select}:nth-child(${i})`).click();
                found = true;
            }
        }).then((element) => {
            if (!found) {
                throw new Error(`${element} not found!`)
            }
        })
    }
}

export default new FacturesPage;