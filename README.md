# Blue Bison Ticketing System

## System Initialization

1. Install MySQL, Node.js, and a git client such as Git Bash.

2. Run `git clone https://github.com/GrantOakland/BlueBison.git` in a terminal.

3. Inside the newly created directory, run `npm i`.

4. Run `npm run build` to build the production environment.

5. Run `npm run start` to start the web server after it's built.

## Codebase Organization

* The `pages` folder contains files which represent different pages of the website.

* The `pages/api` folder is an exception to this, and it contains scripts which run for various API endpoints.

* The `public` folder is for static files on the website.

* The `lib` folder is for modular code that can be imported and reused elsewhere in the project.

* The `components` folder is the modular parts of the UI which can be imported and reused in pages.

* Files in the project's root directory are for configuration and generally should not be edited.

* `sample.sql` is an SQL script which initializes the database and populates it with some sample data.

* `presentation.pdf` is a presentation pertaining to the project.