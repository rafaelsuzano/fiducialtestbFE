class LoginPage {

    visit() {
        cy.visit('/');
    }

    login() {
        cy
            .fixture('data')
            .then(x => {
                cy.get("input[type='text']").type(x.credential.email);
                cy.get("input[type='password']").type(x.credential.password);
                cy.contains("div[class^='companies'] button span", x.credential.loginPassed)
            })

        cy.get("button[type='submit']").click();
    }
}

export default new LoginPage;