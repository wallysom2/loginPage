describe('Login route', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains('Sign In').should('be.visible');
  });

  it('should login with valid credentials', () => {
    const validEmail = 'cliente@youdrive.com';
    const validPassword = 'password';

    cy.get('input[type="text"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.get('button').contains('Sign In').click();

    cy.url().should('include', '/profile');
  });
});

describe('Unsuccessful login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display error message when empty form is submitted', () => {
    cy.get('form').submit();
    cy.get('p').should('be.visible');
  });

  it('should display error message when incorrect data is submitted', () => {
    cy.get('input[type="text"]').type('matheus@gmail.com');
    cy.get('input[type="password"]').type('incorrectPassword');
    cy.get('form').submit();
    cy.get('p').should('be.visible');
  });
});

describe('Profile Page', () => {
  beforeEach(() => {
    const validEmail = 'cliente@youdrive.com';
    const validPassword = 'password';

    cy.visit('/');
    cy.get('input[type="text"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.get('button').contains('Sign In').click();

    cy.url().should('include', '/profile');
  });

  it('renders the profile page', () => {
    cy.get('h3').contains('Profile Picture');
    cy.get('button').contains('Logout');
  });

  it('logs out the user when the logout button is clicked', () => {
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/');
  });
});