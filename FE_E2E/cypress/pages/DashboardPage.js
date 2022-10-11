class DashboardPage {

    openCard(frame, card) {
        switch (frame) {
            case "devis en cours":
                switch (card) {
                    case "en preparation":
                        cy.get('fiducial-quotes-in-progress div div:nth-child(2) fiducial-status-card span')
                            .click()
                        this._confirm().click();
                        break;
                    case "envoyes":
                        cy.get('fiducial-quotes-in-progress div div:nth-child(3) fiducial-status-card span').click();
                        this._confirm().click();
                        break;
                    default:
                        throw Error("unknown card.")
                }
                break;

            case "factures en cours":
                switch (card) {
                    case "en preparation":
                        var el = cy.get('fiducial-invoices-in-progress div div fiducial-status-card span');
                        el.click();
                        this._confirm().click();
                        break;
                    case "a encaisser":
                        cy.expandAndOpenTab("6", "button[label='Confirmer']");
                        break;
                    case "en retard":
                        cy.expandAndOpenTab("12", "button[label='Confirmer']");
                        break;
                    default:
                        throw Error("unknown card.")
                }
                break;
            default:
                throw Error("unknown frame.")
        }
    }

    _confirm() {
        return cy.get("button[label='Confirmer']");
    }

    fiducialConsulting() {
        return cy.get("div[class^='companies'] button span")
    }

    menuItems() {
        return cy.get("ul li a span")
    }

    accessMenu(item){
        cy.get("ul li a span").contains(item).click();
    }
}

export default new DashboardPage;