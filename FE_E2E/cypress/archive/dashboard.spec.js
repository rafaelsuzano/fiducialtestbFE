import loginPage from '../pages/LoginPage'
import dashboardPage from '../pages/DashboardPage'

describe('Dashboard', () => {
    context('Given that user has successfully signed up', () => {
        beforeEach(() => {
            loginPage.visit();
            loginPage.login();
        })

        context('When devis en cours is shown', () => {
            it('Then it should open the tab related to en préparation card', () => {
                dashboardPage.openCard("devis en cours", "en preparation");
            })

            it('And it should open the tab related to envoyés card', () => {
                dashboardPage.openCard("devis en cours", "envoyes");
            })
        })

        context('When factures en cours is shown', () => {
            it('Then it should open the tab related to en préparation card', () => {
                dashboardPage.openCard("factures en cours", "en preparation");
            })

            it('And it should open the tab related to à encaisser card', () => {
                dashboardPage.openCard("factures en cours", "a encaisser");
            })

            it('And it should open the tab related to en retard card', () => {
                dashboardPage.openCard("factures en cours", "en retard");
            })
        })
    })
})