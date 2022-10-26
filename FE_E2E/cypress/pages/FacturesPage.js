import articlesPage from './ArticlesPage';
import clientPage from './ClientPage'
import loginPage from './LoginPage';

class FacturesPage {

    elements = {
        createBtn: () => cy.get("button[label='Créer']"),
        searchClientInput: () => cy.get("fiducial-clients-selection input"),
        createNewClientBtn: () => cy.get("fiducial-create-new-entity-button button"),
        dropDownItems: () => cy.get("table tbody td span"),
        documentType: {
            factureSimple: () => cy.get("fiducial-invoice-type p-radiobutton[label*='simple'] div div:nth-child(2)"),
            factureAcompte: () => cy.get("fiducial-invoice-type p-radiobutton[label*='Acompte'] div div:nth-child(2)"),
            factureRecurrente: () => cy.get("fiducial-invoice-type p-radiobutton[label*='recurrente'] div div:nth-child(2)"),
            factureAvoir: () => cy.get("fiducial-invoice-type p-radiobutton[label*='Avoir'] div div:nth-child(2)")
        },
        devisAssocierInput: () => cy.get("fiducial-search-input:nth-child(3) input"),
        devisAssocierItem: () => cy.get("p-table cdk-virtual-scroll-viewport table tbody td strong:nth-child(1)"),
        articleAssocierInput: () => cy.get("fiducial-search-input:nth-child(2) input"),
        selectArticle: () => cy.get("cdk-virtual-scroll-viewport table tbody td span"),
        articleCodeLabel: () => cy.get("fiducial-articles-line-item input:nth-child(2)"),
        factureAssocierInput: () => cy.get("fiducial-invoice-selection-single fiducial-search-input input"),
        invoicesTableResult: () => cy.get("fiducial-associated-invoices-list table tbody tr td strong"),
        unitPriceInput: () => cy.get("fiducial-articles-line-item [class^='grid p-fluid'] div:nth-child(3) p-inputnumber"),
        envoyerBtn: () => cy.get("button[label='Envoyer']"),
        submitBtn: () => cy.get("button[label='Suivant']")
    }

    validateWarningMessage(data, client, article) {
        this.elements.createBtn().click({ force: true });
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().first().click({ force: true });
        this.documentType(data.documentType);
        this.elements.devisAssocierInput().click({ force: true });
        this.elements.devisAssocierItems().click({ force: true });
        this.validateInvoiceResult(article);
        this.elements.unitPriceInput().type(data.amount);
        clientPage.saveModal();
        loginPage.getDetailMessage()
            .invoke('text')
            .should('eq', data.expectedWarningMessage);
    }

    associateIncoice(client, code) {
        this.elements.createBtn().click();
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().first().click({ force: true });
        this.elements.articleAssocierInput().last().type(code);
        this.elements.dropDownItems().first().click({ force: true });
        //this.elements.articleCodeLabel().first().should('be.visible');
        this.envoyerModal();
    }

    envoyerModal() {
        this.elements.envoyerBtn().click();
        this.elements.submitBtn().click();
        cy.xpath("(//button[@label='Envoyer'])[2]").click();
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
}

export default new FacturesPage;