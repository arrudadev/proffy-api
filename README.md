<h1 align="center">
    <img alt="Proffy" title="Proffy" src=".github/assets/logo.svg" width="220px" />
</h1>

<h4 align="center">
  🚀 Next Level Week #02 - API
</h4>

> A REST API responsible for provide data to the [`web`](https://github.com/monteiro-alexandre/proffy-web) and [`mobile`](https://github.com/monteiro-alexandre/proffy-mobile) front-ends.

<div align="left">
  
![build](https://github.com/monteiro-alexandre/proffy-api/workflows/build/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/monteiro-alexandre/proffy-api/branch/master/graph/badge.svg?token=750YPG0FRR)](https://codecov.io/gh/monteiro-alexandre/proffy-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
</div>

# :pushpin: Table of Contents

* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/monteiro-alexandre/proffy-api.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you use a SSH key registered in your Github account, clone the project using this command:

```
git clone git@github.com:monteiro-alexandre/proffy-api.git
```

**Install dependencies**

```
yarn install
```

Or

```
npm install
```

Create your environment variables based on the examples of ```.env.example```

```
cp .env.example .env
```

After copying the examples, make sure to fill the variables with new values.

# :runner: Getting Started

Run the migrations to configure the database schema

```yarn knex:migrate:latest```

Run the following command in order to start the application in a development environment:

```yarn dev```

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [Proffy API](https://github.com/monteiro-alexandre/proffy-api/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/monteiro-alexandre/proffy-api/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/monteiro-alexandre/proffy-api/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.