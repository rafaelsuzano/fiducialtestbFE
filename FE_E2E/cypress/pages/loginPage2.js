class LoginPage2 {

    usernameInput() {
        return cy.get("input[type='text']");
    }

    passwordInput() {
        return cy.get("input[type='password']");
    }

    loginBtn() {
        return cy.get("button[type='submit']");
    }

}

export default new LoginPage2