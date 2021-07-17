# **Styling in Blitz-web**

## Setup eslint, prettier and husky in your local machine

1. Install dev dependencies first: `npm install --save-dev eslint prettier husky lint-staged`
2. Create `.prettierrc` in root folder and add following to the code if not present

   ```
   {
       "bracketSpacing": true,
       "jsxBracketSameLine": true,
       "singleQuote": true,
       "trailingComma": "all"
   }
   ```

3. Run eslint config by running: `npx eslint --init` and select these options

   1. `To check syntax, find problems, and enforce code style`
   2. `Javascript` language
   3. `React` framework
   4. `Browser` code run
   5. `Standard` style guide
   6. `JSON` config file

4. Check if you have your `.eslintrc.json` file created. The contents of the file should look like this:

   ```
   {
       "env": {
           "browser": true,
           "es2021": true
       },
       "extends": ["plugin:react/recommended", "standard", "prettier"],
       "parserOptions": {
           "ecmaFeatures": {
           "jsx": true
           },
           "ecmaVersion": 12,
           "sourceType": "module"
       },
       "plugins": ["react"],
       "rules": {}
       }
   ```

5. Add `.eslintignore` in the root directory and add the following:

   ```
       node_modules/
   ```

6. Your eslint should be setup now and you can check that by running `npx eslint .` 🎉

7. _You should be getting lots of linter issues. Check the section below to automatically fix those issues_

## **Setup Prettier for auto-fix linter issues**

1. Install eslint-config-prettier by running: `npm install --save-dev eslint-config-prettier` in root

2. Prettier will automate linter fixes so to add that goto `.eslintrc.json` and add the following command under `extends: {...} `. Your extend should look like this now

   ```
    "extends": ["plugin:react/recommended", "standard", "prettier"],
   ```

3. Now if you run `npx eslint .` all the linter issues should be fixed 🎉

## **Setup lint staged pre-commit**

1. Setup lint-staged by running: `npx mrm lint-staged`

2. The previous command should create a folder called `.husky/`

3. Thats it, everything should work now!
