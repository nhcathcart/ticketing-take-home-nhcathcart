#Help Desk

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Testing](#testing)

- [Next-Steps](#next-steps)

## Installation

1. Clone the repository:

```bash

git clone https://github.com/nhcathcart/zealthy-nhcathcart.git

```

2. Navigate to the project directory:

```bash

cd zealthy-nhcathcart

```

3. Install the dependencies:

```bash

npm install

```

4. Replace the .env.example file with an .env.local file and paste in the environment variables

5. Replace the cypress.env.json.example file with a cypress.env.json file and paste in the environment variables

## Usage

1. Start the development server:

```bash

npm run dev

```

2. Open your browser and go to `http://localhost:3000` to use the app.

## Testing

To run the test suite, use the following command (there is a remote test database, so no need to spin one up locally):

```bash

npm  run  test

```

**Requirements**

- Clients (ticket creators)

  - Users can submit support ticket requests.

  - Required fields:

    - Name

    - Email

    - Description of the problem

- Admins (ticket updaters):

  - Support staff can view a list summary of all tickets.

  - Support staff can drill down into individual tickets.

  - Support staff can respond to tickets.

  - Support staff can update the status of tickets.

  - Possible statuses:

    - New

    - In progress

    - Resolved

## Next-Steps

Given more time here are some things I would work on next:

1. Extract some repeated code in the testing suite.

2. Standardize the naming conventions for element ids.

3. Tighten up the styling and usability of the expanded ticket interface to make it more "delightful". This could include a custom drop down rather than the native implementation, and a cleaner looking layout.

4. Actually send the emails, rather than logging to the console.

5. Add an assignment feature, so one admin user is associated with a ticket once they have selected it.

6. Add a topic selection for tickets. (BUG, UI, FEATURE, etc.)
