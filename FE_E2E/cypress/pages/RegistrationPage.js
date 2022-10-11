
class RegistrationPage {

    #elements = {
        createBtn: () => cy.get("div[class^='button-create'] button"),
        clientBtn: () => cy.get("ul li:nth-child(1) fiducial-button-create-item h5"),
        clientType: {
            entreprise: () => cy.get("div[class='formgroup-inline'] div:nth-child(1) p-radiobutton:nth-child(1)"),
            particular: () => cy.get("div[class='formgroup-inline'] div:nth-child(2) p-radiobutton:nth-child(1)"),
            administration: () => cy.get("div[class='formgroup-inline'] div:nth-child(3) p-radiobutton:nth-child(1)"),
            association: () => cy.get("div[class='formgroup-inline'] div:nth-child(4) p-radiobutton:nth-child(1)']"),
            autre: () => cy.get("div[class='formgroup-inline'] div:nth-child(5) p-radiobutton:nth-child(1)")
        },
        continueBtn: () => cy.get("button[label='Continuer']"),
        salutationType: {
            madame: () => cy.get("input[id='madame']"),
            monsieur: () => cy.get("input[id='monsieur']"),
        },
        infoClientForm: {
            name: () => cy.get("input[id='name']"),
            surname: () => cy.get("input[id='surname']"),
            email: () => cy.get("input[id='email']"),
            telephone: () => cy.get("input[id='telephone']"),
            secondaryPhone: () => cy.get("input[id='secondaryPhone']")
        },
        sauvegarderBtn: () => cy.get("button[label='Sauvegarder'] span"),
        paymentDelay: () => cy.get("#paymentDelay"),
        requiredForm: {
            expandPaymentDelay: () => cy.get("fiducial-extension-validity-days button"),
            items: () => cy.get("[class^='validity-days-panel'] ul li div div:nth-child(1)"),
            clienteCode: () => cy.get("input[id=clientCode]"),
            clientReference: () => cy.get("input[id=clientReference]")
        },
        billingContactForm: {
            madame: () => cy.get("fiducial-contact-form p-radiobutton:nth-child(1)"),
            monsieur: () => cy.get("fiducial-contact-form p-radiobutton:nth-child(1)"),
            name: () => cy.get("[salutationformcontrolname='salutationBillingContact'] [formcontrolname='name'] input"),
            surname: () => cy.get("[salutationformcontrolname='salutationBillingContact'] [formcontrolname='surname'] input"),
            department: () => cy.get("[formcontrolname='department'] div input"),
            email: () => cy.get("[salutationformcontrolname='salutationBillingContact'] [formcontrolname='email'] input"),
            mobile: () => cy.get("[salutationformcontrolname='salutationBillingContact'] [formcontrolname='mobile'] input"),
        },
        billingAddressForm: {
            number: () => cy.get("fiducial-input[formcontrolname='line2'] input"),
            address: () => cy.get("fiducial-input[formcontrolname='line1'] input"),
            addressExtention: () => cy.get("fiducial-input[formcontrolname='zone'] input"),
            postalCode: () => cy.get("fiducial-input[formcontrolname='postalCode'] input"),
            city: () => cy.get("fiducial-input[formcontrolname='city'] input"),
            country: () => cy.get("#pr_id_5_label"),
            contries: () => cy.get("p-dropdownitem li span")
        }
    }


    clickOnCreateBtn() {
        this.#elements.createBtn().click();
        this.#elements.clientBtn().click();
    }

    selectClientType(key) {
        switch (key) {
            case "entreprise":
                this.#elements.clientType.entreprise().click();
                break;
            case "particulier":
                this.#elements.clientType.particular().click();
                break;
            case "administration":
                this.#elements.clientType.administration().click();
                break;
            case "association":
                this.#elements.clientType.association().click();
                break;
            case "autre":
                this.#elements.clientType.autre().click();
                break;
            default:
                throw Error("Unknown client type.");
        }
    }

    salutationType(key) {
        switch (key) {
            case "madame":
                this.#elements.salutationType.madame().click();
                break;
            case "monsieur":
                this.#elements.salutationType.monsieur().click();
                break;
            default:
                throw Error("Unknown client type.");
        }
    }

    clickOnContinueBtn() {
        this.#elements.continueBtn().click();
    }

    provideClienteInfo(data) {
        this.#elements.infoClientForm.name().type(data.firstName);
        this.#elements.infoClientForm.surname().type(data.lastName);
        this.#elements.infoClientForm.email().type(data.email);
        this.#elements.infoClientForm.telephone().type(data.firstPhone);
        this.#elements.infoClientForm.secondaryPhone().type(data.secondPhone);
    }

    provideRequeredInfo(data){
        this.#elements.requiredForm.expandPaymentDelay().click({force: true});
        this.#elements.requiredForm.items().contains("120 jours").click();
        this.#elements.requiredForm.clientReference().type(data.clientCode)
    }

}

export default new RegistrationPage;