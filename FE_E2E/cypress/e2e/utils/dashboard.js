import dashboardPage from "../../pages/DashboardPage";

Cypress.Commands.add('accessMenu', (menu) => {
    dashboardPage.menuItems().contains(menu).click();
})