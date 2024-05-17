describe('getProfile', () => {
  it('should return user profile data with valid auth token', () => {
    // First, you need to login to obtain an auth token
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
    }).then(loginResponse => {
      // Check if login was successful
      expect(loginResponse.status).to.equal(200);

      // Extract the access token from the login response
      const authToken = loginResponse.body.tokens.access;

      // Store the auth token in localStorage for subsequent requests
      localStorage.setItem('authToken', authToken);

      // Now, make a request to get the profile using the obtained auth token
      cy.request({
        method: 'GET',
        url: 'https://api.homologation.cliqdrive.com.br/auth/profile/',
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json;version=v1_web',
          'Content-Type': 'application/json',
        },
      }).then(profileResponse => {
        // Check if the profile request was successful
        expect(profileResponse.status).to.equal(200);

        // Check if the response contains profile data
        expect(profileResponse.body).to.have.property('id');
        expect(profileResponse.body).to.have.property('name');
        expect(profileResponse.body).to.have.property('email');
        // Add more assertions as needed for other profile properties
      });
    });
  });
});