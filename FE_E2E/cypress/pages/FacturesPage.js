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
        factureAssocierInput: () => cy.get("fiducial-invoice-selection-single fiducial-search-input input"),
        invoicesTableResult: () => cy.get("fiducial-associated-invoices-list table tbody tr td strong"),
        unitPriceInput: () => cy.get("fiducial-articles-line-item [class^='grid p-fluid'] div:nth-child(3) p-inputnumber"),
        envoyerBtn: () => cy.get("button[label='Envoyer']")
    }

    validateWarningMessage(client, article, data) {
        this.elements.createBtn().click();
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().
            contains(client + " E2E", { matchCase: false }).click();
        this.documentType(data.documentType);
        this.elements.devisAssocierInput().type(article);
        this.elements.dropDownItems().
            contains(article, { matchCase: false }).click();
        this.validateInvoiceResult(article);
        this.elements.unitPriceInput().type(data.amout);
        clientPage.saveModal();
        return loginPage.getDetailMessage();
    }

    associateIncoice(article, client){       
        this.elements.createBtn().click();
        this.elements.searchClientInput().type(client);
        this.elements.dropDownItems().
            contains(client + " E2E", { matchCase: false }).click();
        this.documentType("simple");
        this.elements.devisAssocierInput().type(article);
        this.elements.dropDownItems().
            contains(article, { matchCase: false }).click();






    }

    documentType(key) {
        debugger
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