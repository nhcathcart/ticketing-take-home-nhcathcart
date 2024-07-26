/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to clean up the test database.
       */
      cleanupDatabase(): Chainable<void>;
    }
  }