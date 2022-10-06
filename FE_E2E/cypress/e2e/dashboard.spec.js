import loginPage from '../pages/LoginPage'
import dashboardPage from '../pages/DashboardPage'

describe('Dashboard', () => {
    it('should validate tabs', () => {
        loginPage.visit(); 
        loginPage.login(); 
        dashboardPage.openCard("devis en cours", "en preparation");
    })
})