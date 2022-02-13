import { test, expect, Page } from '@playwright/test';

var skipTourLocator = 'text=Skip Tour'
var usersModuleLocator ='data-testid=users'

var testData = [
    'Adele Vance',
    'Alex Wilber',
    'Allan Deyoung',
    'Automate Bot',
    'Bianca Pisani',
    'Brian Johnson (TAILSPIN)',
    'Cameron White',
    'Christie Cline',
    'Conf Room Adams',
    'Conf Room Baker',
    'Conf Room Crystal',
    'Conf Room Hood',
    'Conf Room Rainier',
    'Conf Room Stevens',
    'Debra Berger',
    'Delia Dennis',
    'Diego Sanchez',
    'Diego Siciliani',
    'Gerhart Moller',
    'Grady Archie',
    'Irvin Sayers',
    'Isaiah Langer',
    'Johanna Lorenz',
    'Joni Sherman',
    'Lee Gu',
    'Lidia Holloway',
    'Lynne Robbins',
    'Mallory Cortez',
    'Megan Bowen',
    'Microsoft Service Account',
    'Miriam Graham',
    'MOD Administrator',
    'Nestor Wilke',
    'Patti Fernandez',
    'Pradeep Gupta',
    'Provisioning User',
    'Raul Razo',
    'Rina Tapaere',
]

test.beforeEach(async ({ page }) => {
    // Log in credentials
    const email = 'adelev@M365x634696.onmicrosoft.com'
    const password = 'Emx82sc7mV'
    
    // Logs in through Microsoft form
    await page.goto('https://syskit-point-e2e-test.azurewebsites.net/');
    await page.locator('button >> nth=0').click();
    await page.locator('id=i0116').fill(email);
    await page.locator('id=idSIButton9').click();
    await page.locator('id=i0118').fill(password);
    await page.locator('id=idSIButton9').click();
    await page.locator('id=idBtn_Back').click();

    console.log("Logged in successfully.");

});

test('cannot delete user due to privileges', async ({ page }) => {

    const checkboxLocator = '.dx-checkbox-icon >> nth=2'
    const confirmDeleteLocator = `//button[contains(@class, 'button primary')]`

    // waits for users module button to be visible
    await page.waitForSelector(usersModuleLocator, {timeout: 5000});
    
    // clicks on users module
    await page.locator('data-testid=users').click();
    
    // waits for button element to be visible
    await page.waitForSelector(skipTourLocator);
    
    // clicks on "skip tour" button
    await page.locator(skipTourLocator).click();
    
    // waits for checkbox to be visible
    await page.waitForSelector(checkboxLocator);
    
    // clicks on checkbox
    await page.locator(checkboxLocator).click();
    
    // click on 'delete user' action
    const deleteUserAction = page.locator(`//div[contains(@class, 'report-action__label')]`).first()
    await deleteUserAction.click();
    
    // wait for confirm button element to be visible
    await page.waitForSelector(confirmDeleteLocator, {timeout: 5000});
    
    // confirm delete action in pop-up window
    await page.locator(confirmDeleteLocator).click();
    
    // open notifications menu 
    const notificationsMenu = page.locator('data-testid=progress-notification-button')
    await notificationsMenu.click();
    
    // validate notification is about action failure
    const actionFailedNotification = page.locator('text=Action completed with errors. ')
    await expect (actionFailedNotification).toContainText('Action completed with errors. ')
    
    // clicks on notification
    await actionFailedNotification.click();
    
    // validate error message (insufficient privileges)
    await expect (page.locator('.status-text')).toContainText('Insufficient privileges to complete the operation.')

    console.log("Status message for action is correct, TEST PASSED.");
})

// parametrized test, one test per each unique data entry (name) is run
// loops through the 'testData' array and runs a test for each item
for (const name of testData) {
    test(`searching for ${name} in users module`, async ({ page }) => {
        
        // waits for users module button to be visible
        await page.waitForSelector(usersModuleLocator, {timeout: 5000});
        
        // clicks on user module
        await page.locator('data-testid=users').click();
        
        // waits for button element to be visible
        await page.waitForSelector(skipTourLocator, {timeout:5000});
        
        // clicks on "skip tour" button
        await page.locator(skipTourLocator).click();
        
        // enter name from test data in search bar
        await page.fill('[aria-label="Search\\ in\\ the\\ data\\ grid"]', name);
        
        // validate user is displayed after searching
        expect (page.locator(`text=${name}`));

        console.log(`Correct user "${name}" displayed, TEST PASSED.`);
    });
}
