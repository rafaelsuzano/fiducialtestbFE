class LoginPage {

    #elements = {
        email: () => cy.get("input[type='text']"),
        password: () => cy.get("input[type='password']"),
        submit: () => cy.get("button[type='submit']"),
        summary: () => cy.get(".p-toast-summary"),
        detail: () => cy.get(".p-toast-detail")
    }

    invalidPassword() {
        cy.visit('/');
        cy
            .fixture('credentials')
            .then(x => {
                this.#elements.email().type(x.credential.email);
                this.#elements.password().type(x.invalidPassword.password);
                this.#elements.submit().click();
                this.#elements.summary().should('contain', x.invalidPassword.summary);
                this.getDetailMessage().should('contain', x.invalidPassword.detail)
            })
    }

    getDetailMessage(){
        return this.#elements.detail();
    }
}

export default new LoginPage;