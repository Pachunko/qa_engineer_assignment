# qa_engineer_assignment

## DEPENDENCIES
- playwright testing framework
  - specified in package.json
  "devDependencies": {
    "@playwright/test": "^1.18.1"
  }

## TESTS
- .tests/sysKitTests.spec.ts
  - 'cannot delete user due to privileges' tests if user can be deleted by logged in user
  - '`searching for ${name} in users module`' loops through 'testData' array, runs a test for each item (name) - tests search bar functionality and if all users are displayed
  - each failed test is rerun max 2 times (this is configured in playwright.config.ts -> retries:)
  - on each failed test a screenshot is taken (configured in playwright.config.ts -> user { screenshot: }) and saved to test-results folder along with trace logs

## RUNNING TESTS
- `npx playwright test`
  - runs all tests in headless mode in chromium, firefox and webkit browser engines
- `npx playwright test .\tests\sysKitTests.spec.ts --project=chromium --headed`
  - runs all tests in headed mode and only in chromium browser engine (use any supported web engine you wish to run in '--project=' parameter)

## REPORTERS
- after all tests are run HTML report is opened in browser automatically along with failure stack trace (report website data is stored in 'playwright-report' folder)
- the test run report is also displayed in terminal
- reporters are configured in 'playwright.config.ts -> reporters: '
- `npx playwright show-report` opens last HMTL report run in default browser
