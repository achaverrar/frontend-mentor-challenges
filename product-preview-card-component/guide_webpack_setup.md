# Guide to set up Webpack 5 for your (HTML, Sass/CSS and JavaScript) project

_\[**Note 1**] As of September of 2022, I've never used JavaScript frameworks, so that's not included in this guide. This might change in the near future._
_\[**Note 2**] I'll use Visual Studio Code editor as well as NPM for this guide._

1.  Create a new folder for your project, let's say `webpack-setup`
2.  Open the folder using VS Code
3.  Open the terminal ( \[ Ctrl ] + \[ Shift ] + [ \` ] )
4.  Type and enter: `npm init -y` in the terminal to create a `package.json` (and a `package-lock.json`) file in your folder with the basic default settings needed to run your project.
    - _\[Note]: if you don't use the flag `-y` in the command, you'll have to fill in the settings yourself. No matter if you use the flag or not, you can always modify the settings from the `package.json` file itself._
5.  Open `package.json` and replace the line `"main": "index.js",` with `"private": true,` to prevent your project is accidentally published as an npm package.
6.  Type and enter: `npm i -D webpack webpack-cli` to install Webpack locally in your project, as a development dependency.

    - _\[Note 1]: if you don't use the flag `-g`, which stands for globally, you're installing the package "locally". In other words, installation is valid and available for this project, but doesn't count for any other project._
    - _\[Note 2]: `i` is a shortcut for `install`. So this command is equivalent to `npm install -D webpack webpack-cli`._
    - _\[Note 3]: The flag `-D` is equivalent to `--save-dev`, so `npm i -D your-package` does the same as `npm i --save-dev your-package`. This flag tells npm to install the package as a development dependency, which means that you, and any other developer or deployment service will need the forementioned package to modify your code and produce the final files for production, but they won't need the package to run your code, once those files are generated._
    - _\[Note 4]: if you ever install a package as a wrong kind of dependency you can run `npm uninstall your-package-name`. An alternative solution would be to look for the package name in your `package.json` file, within `"devDependencies": {}`, remove that line, then delete the folder `node_modules` and run `npm install` in the terminal, to reinstall all the packages listed in your `package.json`._

    _**\[Optional Checkpoint]:** you can verify Webpack was installed correctly by checking your `package.json` file, and looking for `"webpack"` and `"webpack-cli"` in the list of `"devDependencies"`._

7.  Create a folder in `webpack-setup` to store the files you'll use in development. You can name your folder as you like, but Webpack will recognize `src` automatically, by default. I'll use this folder organization for this guide:

    ```
    Webpack_Setup/
    |
    |– src/
    |   |– fonts/
    |   |– images/
    |   |– js/
    |   |– sass/
    |   |– template.html
    |   |– index.js     <--- This is a MUST
    |
    |-package-lock.json
    |-package.json
    |
    ```

    - _\[Note 1]: You don't have to create the exact same file structure, but you **MUST** create a JavaScript file within your `src` folder, because Webpack will use it as an entry point for the rest of files that go in the bundle. The default name Webpack recognizes is `index.js`._
    - _\[Note 2]: We're storing our code for development in a folder, because Webpack will create another folder to store the files for distribution. This will help us be more organized._ -_\[Note 3]: To avoid errors in this stage, use a template without references to external resources or comment out those references in your template, so that we can integrate them gradually later._

8.  Create a JavaScript file for your Webpack settings in the root of your project folder. The default name Webpack will recognize is `webpack.config.js`.
    So far, your folder should look like this:

    ```
    Webpack_Setup/
    |
    |– src/
    |   |– fonts/
    |   |– images/
    |   |– scripts/
    |   |– styles/
    |   |– template.html
    |   |– index.js
    |
    |-package-lock.json
    |-package.json
    |- webpack.config.js  <-- This is new
    |
    ```

9.  Open `webpack.config.js` and add the following lines:

    ```javascript
    const path = require("path");
    /* This will use one of Node modules to find the absolute path to a spacified folder or file. */
    module.exports = {
      mode: "development",
      /* Unlike in "production" mode, Webpack won't minify your code or invest too much time 
      optimizing it, so building will be faster. */
      entry: {
        main: "./src/index.js",
        /* This is the relative path to your entry point, you can use other name instead of "main", 
        this is simply an identifier, when you add more than 1 entry point. */
      },
      output: {
        filename: "scripts/[name].js",
        /* This is the subfolder in the distribution folder, where the bundle of JavaScript modules 
        will be stored. If you used [name].js, [name] will be replaced by the identifier you used in 
        module.exports.entry */
        path: path.resolve(__dirname, "dist"),
        /* This is the absolute path to the distribution folder. It'll be a subfolder of 
        `Webpack_Setup` and its name will be "dist" or whatever you state there. */
        clean: true,
        /* If set to true, files from old building processes will be cleaned every time 
        a bundle is generated */
      },
    };
    ```

10. Add these lines to your `scripts` in package.json:

    ```json
    "scripts" : {
      "build": "webpack", // Will create a dist folder with the files produced in the building process
      "watch": "webpack --watch", // Will be watching your files and trigger the build process every time it detects a change
    }
    ```

    - _\[Note]: "build" and "watch" are names you give to a series of instructions for NPM to run. If you run the command `npm run watch`, you're telling NPM to run the commands under the name "watch", so it'll run `npx webpack --watch` in your terminal._

    **\[Optional Checkpoint]:** to verify you're on the right track, run the script "build". You should see a new folder named `dist` in your root, like this:

    ```
    Webpack_Setup/
    |
    |- dist/
    |   |- scripts/
    |         |- main.js    <--- This is new
    |
    |– src/
    |   |– fonts/
    |   |– images/
    |   |– scripts/
    |   |– styles/
    |   |– template.html
    |   |– index.js
    |
    |-package-lock.json
    |-package.json
    |- webpack.config.js
    |
    ```

    If you take a look at `main.js` you should see it isn't empty, but the opposite! It has some weird comments and code, but you don't have to worry about it.

11. Back to the console, run this command `npm i -D html-webpack-plugin`. The HTML Webpack plugin will help you handle HTML templates, automatically include lines of HTML to it, and store generated HTML files in the `dist` folder. But to use Webpack plugins, you first need to set them up in your settings file.

    - _\[Note]: Webpack uses loaders and plugins. Loaders help recognize and import files in determined formats, whereas plugins help do all sort of tasks with or within these files._

12. Open `webpack.config.js` and add these lines this line: `const HtmlWebpackPlugin = require("html-webpack-plugin");` before `module.exports` and the following lines, at the end of it (or right after the `output` object within `module.exports`). Like so:

    ```javascript
    /* webpack.config.js */
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      /* Here go mode, entry, output */
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/template.html",
          /* This will use your html file as a template */
          filename: "./index.html",
          /* This is the name (and path) Webpack will use to store the generated file */
        }),
      ],
    };
    ```

    **\[Optional Checkpoint]:** if you don't have any code in your template.html, open it and type \[ ! ] + \[ Tab ] to generate some HTML boilerplate.

    Then, run the build command in your terminal again, and check your `dist` folder. You should see a new file called `index.html` like this:

    ```
    dist/
    |   |- scripts/
    |         |- main.js
    |
    |-  index.html      <--- This is new
    ```

    And if you open the new file, you should see a `<script>` tag by the end of the `<head>` referencing your bundle like this:

    ```html
    <!-- index.html -->
    <!-- HTML code from your template -->
    <head>
      <!-- More HTML code from your template -->
      <script defer src="scripts/main.js"></script>
    </head>
    <!-- Even more HTML code from your template -->
    ```

**\[Optional Checkpoint]:** run the `watch` script in your terminal and then open your `index.js` file. Add the following line to it:

```javascript
/* index.js */
console.log("The watch script is working, yaaaaay!!");
```

Save the file, and then open the `index.html` file in your favorite browser. You should see a message in the console of the developer tools (press F12 or right click on the page, and then left click on "Inspect"). To stop watching type \[ Ctrl ] + \[ C ] in the terminal, and then enter `y` (for Yes).

14. Congratulations, you've just finished the basic set up. From now on, the rest of instructions depend on the specific needs of your project, so feel free to skip the tasks that don't apply in your case.

## Add a Live Server

1. Run `npm i -D webpack-dev-server` to install Webpack live server.
2. Add this script to your `package.json`:

   ```json
   "scripts": {
     "serve": "webpack-dev-server --open"
   }
   ```

   **\[Optional Checkpoint]:** run the "serve" script in your terminal. Your default browser should open a tab with your project automatically. Check it is running on a local host and that the message you set up before is showing in the console.

## Integrate external resources

### Images

- Images from your HTML template
- Images from JavaScript and Sass/CSS
- Fonts
  - Fonts from JavaScript and Sass/CSS
- Styles
  - CSS
  - Sass
- JavaScript
  - Modules
    - Multiple modules into 1 bundle
    - Multiple modules into multiple bundles
      - Load scripts in different parts of your code
- Optimize your code
  - Backwards compatibility
  - Minify your code
  - Preload resources
  - Use different settings for development and production
- Deployment (on Netlify)
  Serve the code automatically
  npm i -D webpack-dev-server

  "dev": "webpack --config webpack.config.dev.js",
  "build": "webpack --config webpack.config.prod.js",
  "watch": "webpack --watch --config webpack.config.dev.js",
  "serve": "webpack-dev-server --open --config webpack.config.prod.js"
