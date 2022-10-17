class LoginPage {

    #elements = {
        email: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        submit: () => cy.get("button[type='submit']"),
        summary: () => cy.get(".p-toast-summary"),
        detail: () => cy.get(".p-toast-detail")
    }

    incorrectPassword() {
        cy.visit('/');
        cy
            .fixture('data')
            .then(x => {
                console.log("Login --> " + x.incorrectPassword.email)
                this.#elements.email().type(x.incorrectPassword.email);
                this.#elements.password().type(x.incorrectPassword.password);
                this.#elements.submit().click();
                this.#elements.summary().should('contain', x.incorrectPassword.summary);
                this.#elements.detail().should('contain', x.incorrectPassword.detail)
            })
    }
}

export default new LoginPage;