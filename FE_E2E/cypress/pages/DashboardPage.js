class DashboardPage {

    openCard(frame, card) {
        switch (frame) {
            case "devis en cours":
                switch (card) {
                    case "en preparation":
                        cy.get('fiducial-quotes-in-progress div div:nth-child(2) fiducial-status-card span')
                        .invoke('removeAttr', 'target')
                        .click()
                        this._confirm();
                        break;
                    case "envoyes":
                        cy.get('fiducial-quotes-in-progress div div:nth-child(3) fiducial-status-card span').click();
                        this._confirm();
                        break;
                    default:
                        console.error("Unkown card.");
                }
                break;

            case "factures en cours":
                switch (card) {
                    case "en preparation":
                        cy.get('fiducial-invoices-in-progress div div fiducial-status-card span').click();
                        this._confirm();
                        break;
                    case "a encaisser":
                        cy.xpath("//*[contains(text(),'ENCAISSER')]/../div[2]/button/span").click();
                        cy.get('fiducial-status-card-expandable-item span').each(x => x.cy.click)
                        break;
                    case "en retard":
                        cy.xpath("//*[contains(text(),'RETARD')]/../div[2]/button/span").click();
                        cy.get('fiducial-status-card-expandable-item span').each(x => x.cy.click)
                        break;
                    default:
                        console.error("Unkown card.");
                }
                break;
            default:
                console.error("Unkown frame.");
        }
    }

    _confirm() {
        const button = cy.get("button[label='Confirmer']");
        button.click();
      }
}

export default new DashboardPage;