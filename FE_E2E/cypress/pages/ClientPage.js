class ClientPage {

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
        infoClientForm: {
            madame: () => cy.get("fiducial-client-particular-info-form p-radiobutton:nth-child(1) div:nth-child(2)"),
            monsieur: () => cy.get("fiducial-client-particular-info-form p-radiobutton:nth-child(3) div:nth-child(2)"),
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
            madame: () => cy.get("fiducial-contact-form p-radiobutton:nth-child(1) div:nth-child(2)"),
            monsieur: () => cy.get("fiducial-contact-form p-radiobutton:nth-child(3) div:nth-child(2)"),
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
            expandCountry: () => cy.get("fiducial-address-form p-dropdown div:nth-child(3)"),
            contries: () => cy.get("ul[role='listbox'] li span")
        },
        header: () => cy.get("h2:last-of-type"),
        searchTxt: () => cy.get("fiducial-search-input input"),
        invoiceSaved: () => cy.get("table tbody tr td:nth-child(2) strong"),
        sirenInput: () => cy.get("fiducial-client-enterprise-siren-finder input"),
        sirenSelection: () => cy.get("fiducial-client-enterprise-siret-selection .pb-1"),
        tableNonColumn: () => cy.get("fiducial-content-state table td:nth-child(2) strong")
    }

    addParticulierClient(data) {
        this.fillParticulierForm(data)
            .each(($el, index, arr) => {
                arr.push($el.text().toLowerCase());
            }).then((arr) => {
                expect(arr.toArray()).includes(data.expectedResult.toLowerCase());
            })
    }

    fillParticulierForm(data) {
        this.clickOnCreateBtn();
        this.selectClientType(data.clientInfo.clientType);
        this.#elements.continueBtn().click();
        this.salutationClientType(data.billingContact.greeting);
        this.#elements.infoClientForm.name().type(data.clientInfo.firstName);
        this.#elements.infoClientForm.surname().type(data.clientInfo.lastName);
        this.#elements.infoClientForm.email().type(data.clientInfo.email);
        this.#elements.infoClientForm.telephone().type(data.clientInfo.firstPhone);
        this.#elements.infoClientForm.secondaryPhone().type(data.clientInfo.secondPhone);
        this.#fillRequeredForm(data);
        this.salutationBillingType(data.billingContact.greeting);
        this.#fillBillingContactForm(data);
        this.#fillBillingAddress(data);
        this.#elements.sauvegarderBtn().click();
        this.searchItem(data.clientInfo.firstName);
        return this.#elements.invoiceSaved();
    }

    fillEntrepriseForm(data) {
        this.clickOnCreateBtn();
        this.fillEntrepriseModal(data);
        this.#elements.infoClientForm.email().type(data.clientInfo.email);
        this.salutationBillingType(data.billingContact.greeting);
        this.#fillBillingContactForm(data);
        this.#fillBillingAddress(data);
        this.#elements.continueBtn().click();
    }

    fillEntrepriseModal(data) {
        this.#elements.sirenInput().type(data.clientInfo.siren);
        this.#elements.sirenSelection().then($el => { expect($el[0].getAttribute('class')).to.exist; })
        this.#elements.continueBtn().click();
    }

    #fillRequeredForm(data) {
        this.#elements.requiredForm.expandPaymentDelay().click({ force: true });
        this.#elements.requiredForm.items().contains(data.requiredInfo.delay).click();
        // this.#elements.requiredForm.clienteCode().type(data.requiredInfo.clientCode)
    }

    #fillBillingContactForm(data) {
        this.#elements.billingContactForm.name().type(data.billingContact.name);
        this.#elements.billingContactForm.surname().type(data.billingContact.surname);
        this.#elements.billingContactForm.department().type(data.billingContact.department);
        this.#elements.billingContactForm.email().type(data.billingContact.email);
        this.#elements.billingContactForm.mobile().type(data.billingContact.mobile);
    }

    #fillBillingAddress(data) {
        this.#elements.billingAddressForm.number().type(data.billingAddress.number);
        this.#elements.billingAddressForm.address().type(data.billingAddress.address);
        this.#elements.billingAddressForm.addressExtention().type(data.billingAddress.extention);
        this.#elements.billingAddressForm.postalCode().type(data.billingAddress.zipCode);
        this.#elements.billingAddressForm.city().type(data.billingAddress.city);
        this.#elements.billingAddressForm.expandCountry().click({ force: true });
        this.#elements.billingAddressForm.contries().
            contains(data.billingAddress.country, { matchCase: false }).click();
    }

    clickOnCreateBtn() {
        this.#elements.createBtn().click();
        //this.#elements.clientBtn().click();
        this.#elements.clientBtn().then($btn => {
            if ($btn.is(':visible'))
                cy.wrap($btn).click();
        })
    }

    getClientNome(){
        return this.#elements.tableNonColumn();
    }

    saveModal() {
        this.#elements.sauvegarderBtn().click();
    }

    searchItem(data){
        this.#elements.searchTxt().type(data);
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

    salutationClientType(key) {
        switch (key) {
            case "madame":
                this.#elements.infoClientForm.madame().click({ force: true });
                break;
            case "monsieur":
                this.#elements.infoClientForm.monsieur().click({ force: true });
                break;
            default:
                throw Error("Unknown client type.");
        }
    }

    salutationBillingType(key) {
        switch (key) {
            case "madame":
                this.#elements.billingContactForm.madame().click({ force: true });
                break;
            case "monsieur":
                this.#elements.billingContactForm.monsieur().click({ force: true });
                break;
            default:
                throw Error("Unknown billing type.");
        }
    }
}

export default new ClientPage;