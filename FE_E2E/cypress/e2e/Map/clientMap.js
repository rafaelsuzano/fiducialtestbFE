class clientMap {

    createBtn() {
        return cy.get("div[class^='button-create'] button");
    }

    clientBtn() {
        return cy.get("fiducial-button-create-item div div h5");
    }

    clientType() {
        return {
            entreprise: cy.get("input[id='ENTERPRISE']"),
            particular: cy.get("input[id='PARTICULAR']"),
            administration: cy.get("input[id='ADMINISTRATION']"),
            association: cy.get("input[id='ASSOCIATION']"),
            autre: cy.get("input[id='OTHERS']")
        }
    }

    continueBtn() {
        return cy.get("button[label='Continuer']");
    }

    salutationType() {
        return {
            madame: cy.get("input[id='madame']"),
            monsieur: cy.get("input[id='monsieur']")
        }
    }

    infoClientForm() {
        return {
            name: cy.get("input[id='name']"),
            surname: cy.get("input[id='surname']"),
            email: cy.get("input[id='email']"),
            telephone: cy.get("input[id='telephone']"),
            secondaryPhone: cy.get("input[id='secondaryPhone']")
        }
    }

    sauvegarderBtn(){
        return cy.get("button[label='Sauvegarder'] span");
    }

    paymentDelay(){
        return cy.get("#paymentDelay");
    }

    infoRequiredForm(){
        return {
            delay: ""

        }
    }
}


