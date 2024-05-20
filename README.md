# B2Bit Login Page

This project is a secure web application that allows users to log in using:

* **Email and Password:** Enter your registered email address and password for traditional authentication.
* **Social Login:** Sign in conveniently with your existing Google or Facebook accounts.

The application leverages React Router for smooth navigation and Context API for efficient state management.

##  📖 Project Overview

The B2Bit Login Page application comprises several essential components:

* **Login Page:** This is the initial entry point where users can choose their preferred login method.
* **Profile Pages:** After successful authentication, dedicated profile pages for each social login option (Google and Facebook) provide users with relevant account information.
* **Authentication State Management:** The React Context API ensures centralized control and accessibility of authentication state throughout the application.
* **Theme Management:** Create a customizable user experience by managing the application's theme using the Context API.

The application's routing structure is designed for intuitive navigation:

![tela](https://github.com/wallysom2/loginPage/assets/37665843/f7663970-363a-4230-934b-92142edf464e)

### Routes

- `/`: The root route leads to the login page.
- `/profile`: This route leads to the user's profile page.
- `/google-profile`: This route leads to the user's Google profile page.
- `/facebook-profile`: This route leads to the user's Facebook profile page.

### Prerequisites

Before starting the project installation, it is essential that some prerequisites are met, and each of them are listed below.

  ```sh
npm install npm@latest -g
  ```
  ```sh
npm install cypress --save-dev
  ```

Additionally, if you're a **Linux** user, be sure to visit the [Cypress Docs](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites). This resource is essential for executing Cypress locally on your machine.

## 🚀 Installation and Usage

Follow these steps to set up and run the B2Bit Login Page application:

### Installation


**1. Clone the Repository:**

```sh
git clone https://github.com/wallysom2/loginPage.git
```

**2. Install NPM packages:**
```sh
npm install
```
**3. Configure your `.env` file:**

(Temporário-b2bit): As chaves de acesso já estão no código. Não há necessidade de mudar o `.env`

```env
VITE_GOOGLE_CLIENT_ID=
VITE_FACEBOOK_CLIENT_ID=
```
<!-- Get a free API Key at [https://example.com](https://example.com)-->


### Usage
To start using the project, just follow the steps that were presented along the Roadmap and:
```sh
npm run dev
```

## 🧪 Testing
This project uses Cypress for end-to-end testing and Vitest for unit testing. To run tests, use:

**Cypress (E2E Tests)**

```sh
npm run cypress:web
```
```sh
npm run cypress:run
```

**Vitest (Units Tests)**



```sh
npm run test:vitest
```

**Coverage and Run all tests**
```sh
npm run coverage
```
```sh
npm run test:all
```

## 📝 License
This project is under the MIT license. See the LICENSE file for more details.


Made by Your wallysom2!
