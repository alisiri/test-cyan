# Tapedeck Test

A javascript and typescript practical test.

Implement a tapedeck's button and spindle interactivity in JS and/or TS with a little SCSS.

### The test
- implement a typescript and/or javascript ES5 (plain old browser JS) solution
- solution(s) to solve the problem of:
  - instantiating with a DOM object that is passed via bootstrap function to the solution code
  - implements tape deck logic on a tape deck rendered into the DOM
  - can co-exist with other instances of the same (or the other, if appropriate) solution
- write unit tests for the solution

### Prerequisites

- a computer
- an environment that can run node/npm and grunt tasks (grunt may be installed as a dev dependency if it is not available in your environment)
- node/npm
- git and/or your favourite git gui
- a github account
- your favourite web dev editor or IDE
- chrome/chromium (just to be safe, we haven't cross-browser tested this yet)

You do not need to run a web server to serve up the project, everything should operate correctly when loaded in a web browser directly from the filesystem.

### About

Don't be alarmed by the verbosity of this file, we have made every effort to prepare an easy environment in which to just start writing code.

The purpose of this test is to demonstrate your ability to write code to handle typical event driven changes of state, to control the behaviour of the buttons and spindles of a tape machine present in the browser's DOM, in such a way that your solution can be instantiated multiple times on the same page.

Aside from the technical aspects, this test is non-representative of our product(s) and is just a test.

But in the technical aspects it is a small representative sampling of our current build chain and our mixed typescript/javascript environment, so if you find this test incredibly painful it may be a sign that you should abandon it.

The test will assess a number of things.

## What we're looking at

- we don't really care how long you take to do the test, we understand you are probably currently working a full time job..
  - we are more interested in seeing a reasonably clean git history demonstrating:
    - familiarity working with git
    - sensible atomicity of commits
    - sensible commit messages
  - so even if you knock this out of the park like a pro in a 30 minute coding session, please take that into account and proceed accordingly!
- accurate and elegant implementation of the state logic for managing the tape machine
- ability to manage basic DOM traversal and manipulation
- code to be modular, allowing multiple instantiations, handling multiple tapedecks on the same page without interference
- unit tests
  - no not our unit tests, yours!
  - we would like you to write as unit tests to prove the implementation works as specified and defend against regressions
  - we will include some examples because the test suite we've set up for you is a tiny bit dated.
    - unit tests need to be written for qunit 1.12.0 (sadly) because that is what we use right now, some examples have been provided.
    - you can find the documentation here. At the internet wayback machine archive. ...
      - API: https://web.archive.org/web/20130828121045/http://api.qunitjs.com:80/
      - Cookbook: https://web.archive.org/web/20130901115946/http://qunitjs.com:80/cookbook
      - yep.. 2013. At some point we will migrate, but not today.
    - **I've also compiled the html pages for the qunit API and included them in the source repo (`docs/qunit-api`) so you have a faster reference than archive.org**, though it links out to jquery's online API docs to provide references for basic type definitions, so keep that in mind (evidently, at the time of this version qunit was more embedded into the jquery ecosystem.)
    
### Choice of language (background info)
- historically we have been an ES5 dev shop and a lot of our legacy code is written in ES5, being comfortable working in ES5 and debugging etc is a critical skill for a new candidate
- we are moving to a more rigorous integration in typescript, so as time progresses strong typescript skills will become more and more important
- ideally, if you have time and knowledge of both languages, an implementation in each language would be advantageous
- but we recognise that your time is valuable, so if you would prefer to do one language or the other, pick the one that best demonstrates your skills and we may revisit the other language at a later stage of the interviewing process

### Repo structure

- `index.html` defines a basic user interface that should simulate its real life counter-part. The repository should contain enough content in the `dist/` directory to let you see what you're working with, but it is otherwise `.gitignore`-ed. You should not need to change this file.
- `index.dev.html` is the above file but prepared for your convenience to use the intermediate `build/` directory for debugging etc, you will need to change parts of this file if your solution incorporates additional files or you change the names of some source files.
- `src/css/` contains sass format .scss files, feel free to modify the contents of this directory however you please.
- `src/ts/` contains typescript source code, this is where the typescript part of a solution to the test would go.
- `src/js/` as above, but for javascript (ES5.)
- `src/lib/` jquery, for your and our convenience and some irrelevant-to-the-test code for handling tabs in `index.html`.
- `tests/` are where qunit unit tests are defined, open `tests/test-both/index.html` to see the tests run in your browser.
- `Gruntfile.js` defines some grunt tasks for building and testing code, *including the list of test files to be run*.
- `package.json` defines build dependencies for npm and, importantly, file paths for source concatenation. Elaborated on later; You will need to edit parts of this file if your solution incorporates additional files or you change the names of some source files.
- `tsconfig.json` defines the typescript configuration, obviously, but of note- we are targeting ES5 and using namespaces to generate similar compiled output to the ES5 javascript example code provided. Please maintain the module convention in your solution for both/either the typescript and javascript cases.

### Building the project

After cloning the repo, have a look at `index.html` in a web browser to see your starting point. Next you will want to get the dev dependencies so you can build the project. You'll need npm so that you can run `npm install` to get the node modules.

Once you have those, the `grunt` tasks can be used to work with the project.

You may need to add the project's `node_modules/.bin` path to your execution path depending on your operating system and environment etc.

#### But first an important note about `package.json`

There are file definitions for both the `ts` and `js` grunt tasks defined in `package.json`. Although the basic build tasks will "build" the entire contents of their source directories, only the files listed in the relevant `package.json` sections will be concatenated, minified and ultimately placed in the `dist/` directory. Be aware, it is this final distributable directory that the unit tests are / should be run against.

If your solution is split across multiple files they will need to be listed in these sections in the order in which they should be concatenated. No fancy webpack assistance (etc) in this case.

#### Back to the grunt tasks

- `grunt clear` clears the `build/` and `dist/` directories
- `grunt clean-post` deletes the `build/` directory
- `grunt libs` copies the contents of the `src/lib/` directory into `build/lib/`
- `grunt ts` compiles the contents of the `src/ts` directory, the generated output will be in `build/js/generated`
- `grunt js` simply copies the contents of the `src/js` directory into `build/js`
- `grunt sassy` builds the `src/css` directory from the `Tapedeck.scss` file, which includes other files and may be modified. Its output is `build/css/tapedeck.css`.
- **`grunt build` cleans the build dir and then runs the above four tasks.** Assuming you have updated `index.dev.html` to reflect any files that you have added to (or renamed / removed from) `package.json` you should now be able to debug changes to the code.
- `grunt dist` concatenates and minifies the files listed in `package.json` from the build directory and outputs to `dist/`.
- **`grunt build-dist` cleans dist dist dir and then runs the above two tasks.
- `grunt test` runs the unit tests defined in `tests/test-both` (and listed in `Gruntfile.js`) which are configured to use the contents of `dist/`.

### The code

You'll see that sample typescript and sample javascript files are included. In each case there is a bootstrap function which allows a consistent code entrypoint that will be called when the html page has completely loaded. It is called with the tapedeck element as an argument.

You should leave the bootstrap module/namespace and function in place with its current signature, as well as its calling code in the html files, but you are welcome to modify the contents of that bootstrap function to suit your solution and remove the example code we put in there.

You are also welcome to add/change/rename any other module or namespace to suit your needs. Just don't mess with the bootstrap stuff.

Be aware that in the index file your typesript and javascript modules exist side by side in global scope, so take care not to name your modules identically across languages.

### The tests

We've set up a test environment that should be fairly easy to adapt to your needs. We've left comments in the test files to explain what is going on and suggest how the tests may be used or adapted to suit, for example, test driven development and illustrating how to define tests that run against both javascript and typescript implementations as well as unique cases for each.

The tests are configured to run against the distributable (`dist/`) output of the build chain, so obviously you need to have run `grunt dist` to test changes.

You can run the unit tests directly in your web browser allowing you to step through the test code in a debugger. If you duplicate the `test-both` directory and update its `index.html` you could also run the test against the build directory and debug your code from the unit test environment.

Feel free to discard anything you don't find useful or modify whatever you need to to get what you want from the test harness. There are suggestions throughout the comments.

### Button logic

- While the play button is depressed
  - No other buttons can be pressed except the pause button, the stop button and the record button
  - The spindles spin clockwise at the speed provided in the example scss files
- While the rewind button is depressed
  - No other buttons can be pressed except the stop button
  - The spindles spin counter-clockwise at double the speed of play
- While the fastforward button is depressed
  - No other buttons can be pressed except the stop button
  - The spindles spin clockwise at double the speed of play
- When the stop button is pressed
  - No buttons are depressed
  - The spindles stop moving
- When the pause button is pressed
  - If the play or record buttons are depressed
    - The pause button becomes depressed and the spindles stop moving, until
    - The pause button becomes un-depressed
  - ie. it's a toggle
- The record button
  - May only be pressed while the Play button is also pressed
  - Does not change the movement of the spindles
- For the purposes of this test, the record button functions like the play button
- For the purposes of this test, the record button functions like the play button
- The only buttons that "toggle" on a repeated click are the pause and record buttons, don't be misled by the example code

### Quick links

If you wish to implement a solution with minimal changes to the structure of the code (renaming or adding files) you can get started quickly in these places:

- [Unit test code (the tests)](https://github.com/CAPSICUM/frontend-dev-test/blob/master/tests/test-both/tests.js#L72)
- [Where the unit test environment is set up](https://github.com/CAPSICUM/frontend-dev-test/blob/master/tests/test-both/index.html#L26)
- Typescript: [bootstrap code](https://github.com/CAPSICUM/frontend-dev-test/blob/master/src/ts/bootstrap.ts#L6), [typescript solution code](https://github.com/CAPSICUM/frontend-dev-test/blob/master/src/ts/tapedeck/tapedeck.ts)
- Javascript: [bootstrap code](https://github.com/CAPSICUM/frontend-dev-test/blob/master/src/js/bootstrap.js#L14), [javascript solution code](https://github.com/CAPSICUM/frontend-dev-test/blob/master/src/js/tapedeck/tapedeck.js)
- Styling: [sass rules](https://github.com/CAPSICUM/frontend-dev-test/blob/master/src/css/_tapedeck.scss)
- Running the code: [dev mode](https://github.com/CAPSICUM/frontend-dev-test/blob/master/index.dev.html#L63) (scripts from `build/`,) [dist mode](https://github.com/CAPSICUM/frontend-dev-test/blob/master/index.html#L61) (scripts from `dist/`.)
