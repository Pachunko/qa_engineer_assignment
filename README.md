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
  - `searching for ${name} in users module` loops through 'testData' array, runs a test for each item - tests search bar functionality and if all users are displayed
  - each failed test is rerun max 2 times (this is configured in playwright.config.ts -> retries:)
  - on each failed test a screenshot is taken (configured in playwright.config.ts -> user { screenshot: }) and saved to test-results folder along with trace logs
