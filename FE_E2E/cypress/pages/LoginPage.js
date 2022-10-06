class LoginPage {

    visit() {
        cy.visit('/');
    }

    login() {
        cy
            .fixture('data')
            .then(x => {
                cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[1]/fiducial-input/div/input')
                    .type(x.credential.email);
                cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/fiducial-input/div/input')
                    .type(x.credential.password);
            })

        cy.xpath('/html/body/fiducial-root/fiducial-erp-login/div/div/p-card/div/div/div/fiducial-erp-login-form/form/div[2]/button')
            .click();
    }
}

export default new LoginPage;