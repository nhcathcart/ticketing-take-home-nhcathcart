before(() => {
  cy.cleanupDatabase();
});
describe("Navigation", () => {
  it("should render the nav links", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#nav-link-new-ticket").should("exist");
    cy.get("#nav-link-admin").should("exist");
  });
  it("should render the nav links on mobile", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:3000/");
    cy.get("#open-nav-button").click();
    cy.get("#mobile-nav-link-new-ticket").should("be.visible");
    cy.get("#mobile-nav-link-admin").should("be.visible");
  });
  it("should close the mobile menu when the close button is clicked", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:3000/");
    cy.get("#open-nav-button").click();
    cy.get("#mobile-nav-link-new-ticket").should("be.visible");
    cy.get("#mobile-nav-link-admin").should("be.visible");
    cy.get("#close-nav-button").click();
    cy.get("#mobile-nav-link-new-ticket").should("not.visible");
    cy.get("#mobile-nav-link-admin").should("not.visible");
  });
  it("should navigate to the admin login page when admin is clicked", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#nav-link-admin").click();
    cy.url().should("include", "/admin/login");
  });
  it("should navigate to the homepage when new ticket is clicked", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#nav-link-new-ticket").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("Login", () => {
  it("should render the login form", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-form").should("exist");
  });
  it("should show an error message when the wrong credentials are entered", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("bademail@bademail.com");
    cy.get("#login-password").type("badpassword");
    cy.get("#login-submit").click();
    cy.get("#bad-credentials-message").should("exist");
  });
  it("should navigate to the admin dashboard when the correct credentials are entered", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.url().should("eq", "http://localhost:3000/admin");
  });
});

describe("New Ticket Form", () => {
  it("should render the new ticket form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#new-ticket-form").should("exist");
  });
  it("should show 3 error messages when the form is submitted with no data", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#submit-ticket-button").click();
    cy.get("#full-name-error").should("exist");
    cy.get("#email-error").should("exist");
    cy.get("#description-error").should("exist");
  });
  it("should display the modal on successful form submission and hide it on close", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#new-ticket-modal").should("not.exist");
    cy.get("#fullName").type("John Doe");
    cy.get("#email").type("john@doe.com");
    cy.get("#description").type("This is a description for the form");
    cy.get("#submit-ticket-button").click();
    cy.get("#new-ticket-modal").should("exist");
    cy.get("#close-modal-button").click();
    cy.get("#new-ticket-modal").should("not.exist");
  });
});

describe("Admin Page", () => {
  it("should render the ticket display", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get("#ticket-display").should("exist");
  });
  it("should render the ticket from the previous test", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-parent-"]').should("have.length", 1);
  });
  it("should have a requester of 'John Doe' on the ticket", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-creator-"]').should("have.text", "John Doe");
  });
  it("should have a status of 'new' on the ticket", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-status-"]').should("have.text", "New");
  });
  it("should have a request date on the ticket", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-date-"]').should("exist");
  });
  it("should initially hide the ticket details, and show them on click", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-description-"]').should("not.be.visible");
    cy.get('[id^="ticket-item-visible-"]').click();
    cy.get('[id^="ticket-item-description-"]').should("be.visible");
  });
  it("should change the status of the ticket when the status select is changed, and persist it to the DB", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    //open the ticket details to reveal the status select menu
    cy.get('[id^="ticket-item-visible-"]').click();
    cy.get('[id^="status-select-"]').select("Resolved");
    cy.get('[id^="ticket-item-status-"]').should("have.text", "Res");
    //reload the page to ensure the status is persisted
    cy.reload();
    cy.get('[id^="ticket-item-status-"]').should("have.text", "Res");
  })
  it("should log the message to the console when the send message form is submitted", () => {
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    //open the ticket details to reveal the status select menu
    cy.get('[id^="ticket-item-visible-"]').click();
    cy.get('[id^="message-form-"]').type("This is a test message");
    //stub the console
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });
    cy.get('[id^="send-message-button-"]').click();
    cy.get("@consoleLog").should("be.calledWith", "here we would send an email to: ");
    cy.get("@consoleLog").should("be.calledWith", "with a subject of: ");
    cy.get("@consoleLog").should("be.calledWith", "with the message: ");
  })
  it("should displaly the tickets in reverse chronological order", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#fullName").type("Jane Doe");
    cy.get("#email").type("jane@doe.com");
    cy.get("#description").type("This is a description for the SECOND form");
    cy.get("#submit-ticket-button").click();
    cy.get("#close-modal-button").click();
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.visit("http://localhost:3000/admin/login");
    cy.get("#login-email").type("test@test.com");
    cy.get("#login-password").type("password");
    cy.get("#login-submit").click();
    cy.get('[id^="ticket-item-creator-"]').first().should("have.text", "Jane Doe");
  })
});
