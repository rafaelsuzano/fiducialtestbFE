import loginPage from '../pages/LoginPage'

describe('Login', () => {
    context('Given that user has the credentials', () => {
        context('When login with invalid password is submitted', () => {
            it('Then it should not succesfully login', () => {
                loginPage.invalidPassword();
            })
        })
    })
})