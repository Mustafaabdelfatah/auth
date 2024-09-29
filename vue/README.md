# Vue Starter Project

### Features

- Vue 3: A modern JavaScript framework for building user interfaces.
- SCSS: A powerful CSS preprocessor for better styling and organization.
- Multi-language support using I18n: Easily support multiple languages in your application.

#### Prerequisites

1. Node.js (version 18 or higher): [Download Node.js v18.12.0](https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi)

2. Yarn: Install via npm if not already installed:

```bash
npm install --global yarn
```

3. Vite: Install via npm if not already installed:

```bash
npm install --global vite
```

### Installation

1. Clone the Repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd vue-starter
```

3. Environment Variables
   ##### Create a .env file at the root of your project to define necessary environment variables. For example:

```bash
VITE_LOCALE=en
```

4. Run the Development Server

   ##### Serve the project with hot reload using Yarn:

```bash
yarn dev
```

5. Run the Development Server

###### To build the project for Development, run:

```bash
yarn build
```

###### To build the project for Testing, run:

```bash
yarn build:testing
```

###### To build the project for Production, run:

```bash
yarn build:production
```

4. Preview the Production Build:

```bash
yarn preview
```

### Project Structure

Here is a brief overview of the project structure:

├── public # Static assets
├── src
│ ├── assets # Project-specific assets (images, fonts, etc.)
│ ├── components # Vue components
│ ├── i18n # Internationalization configuration
│ ├── styles # SCSS styles
│ ├── views # Vue views/pages
│ ├── App.vue # Main app component
│ ├── main.js # Entry point
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project metadata and dependencies
├── vite.config.js # Vite configuration
└── yarn.lock # Yarn lock file

### Customizing

#### Adding Languages

To add new languages, follow these steps:

    1- Create a new language file in the src/i18n directory, e.g., fr.json for French.
    2- Update the I18n configuration in src/i18n/index.js to include the new language.

#### Recommended Tools:

- VS Code: A powerful, lightweight code editor. Download VS Code
- Vetur: A VS Code extension for Vue.js development. Install it from the VS Code marketplace.

## Commit Message Format

To maintain a clear and consistent commit history, we follow a specific format:

```
<type>(<scope>): <description>
```

- **Type**: Purpose of the commit (e.g., `feat`, `fix`).
- **Scope**: Part of the system affected (optional).
- **Description**: Concise description of changes.

### Common Types and When to Use Them

- **feat**: Introduces a new feature to the codebase.
- **fix**: Fixes a bug.
- **docs**: Changes to documentation only.
- **style**: Formatting, missing semicolons, etc.; no change in the code logic.
- **refactor**: Refactoring code without changing its behavior or adding features.
- **perf**: Performance improvements.
- **test**: Adding or fixing tests.
- **chore**: Maintenance tasks that don't modify `src` or `test` files.

### Examples

- `feat(auth): Implement user authentication logic`
- `fix(header): Correct misaligned logo in the header`
- `docs(readme): Update installation instructions`
- `style: Apply code formatting to ContactForm component`
- `refactor: Simplify state management in the dashboard`

### Packages

- vuetify: A Material Design component framework for Vue.js. Vuetify provides a wide range of UI components that follow the Material Design guidelines, helping you build beautiful, responsive applications quickly and efficiently.

- yup: A JavaScript schema builder for value parsing and validation. It is often used in conjunction with form validation libraries to define and enforce validation rules and constraints.

- vue-router: The official router for Vue.js. Vue Router provides a way to map URLs to components, enabling client-side routing and creating single-page applications with multiple views.

- vue-meta: A Vue.js plugin for managing metadata in Vue components. It allows you to easily add and manage metadata such as titles, meta tags, and link elements in a declarative manner.

- vue-i18n: The internationalization plugin for Vue.js. It provides comprehensive features for localization, including message translation, date/time formatting, and pluralization, to help you build multilingual applications.

- vee-validate: A form validation library for Vue.js that integrates well with Vue 3's Composition API. It allows you to define and manage validations in a declarative manner, using schemas or individual rules.

- sweetalert2: A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes. It makes it easy to create alerts, confirmations, and other dialog boxes with modern styling.

- pinia: The intuitive store for Vue.js applications. Pinia is the state management library designed specifically for Vue 3, providing a simpler and more flexible API compared to Vuex.

- axios: A popular JavaScript library used to make HTTP requests from the browser or Node.js. It supports the Promise API, interceptors, automatic transforms for JSON data, and more, making it easy to interact with RESTful APIs.

- @vueuse/core: A collection of essential Vue Composition Utilities for Vue 2 and Vue 3, inspired by React Hooks. It provides utilities for state management, event handling, side effects, and more, leveraging the power of the Composition API.