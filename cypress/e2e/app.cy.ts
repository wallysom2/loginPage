describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays error message when login fails', () => {
    cy.get('input[name="email"]').type('invalid-email@example.com');
    cy.get('input[name="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();
    cy.contains('Error logging in. Invalid data.').should('exist');
  });


  it('displays error message when no data is entered', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Required').should('exist');
  });

  it('renders login form correctly', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
    
  });

  it('fills out form and submits successfully', () => {
    cy.get('input[name="email"]').type('cliente@youdrive.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'profile');
  });
});

describe('Profile Tests', () => {
  let authToken;

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://api.homologation.cliqdrive.com.br/auth/login/',
      body: {
        email: 'cliente@youdrive.com',
        password: 'password',
      },
      headers: {
        Accept: 'application/json;version=v1_web',
        'Content-Type': 'application/json',
      },
    }).then((loginResponse) => {
      authToken = loginResponse.body.tokens.access;
    });
  });

  beforeEach(() => {
    localStorage.setItem('authToken', authToken);
    cy.visit('/profile');
  });

  it('renders profile details correctly', () => {
    cy.get('h3').contains('Profile Picture').should('exist');
    cy.get('img').should('exist');
    cy.contains('Name').should('exist');
    cy.contains('Email').should('exist');
  });

  it('logs out user when logout button is clicked', () => {
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/');
  });
});
