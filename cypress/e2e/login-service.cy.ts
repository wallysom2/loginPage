/// <reference types="cypress" />

describe('loginService', () => {
  it('should return tokens after successful login', () => {
    const email = 'cliente@youdrive.com';
    const password = 'password';

    cy.request({
      method: 'POST',
      url: 'https://api.homologation.cliqdrive.com.br/auth/login/',
      body: {
        email: email,
        password: password,
      },
      headers: {
        Accept: 'application/json;version=v1_web',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      expect(response.status).to.equal(200);
      expect(response.body.tokens).to.have.property('access');
      expect(response.body.tokens).to.have.property('refresh');

      cy.wrap(response.body.tokens.access).as('accessToken');
      cy.wrap(response.body.tokens.refresh).as('refreshToken');
    });
  });
});
