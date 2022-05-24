<h1 align="center">eslint-plugin-terraform-rules</h1>

Rules set for Terraform using the Terraform-ESLint-parser which can be found here:
https://github.com/anguud/Terraform-ESLint-parser

This project was written as part of a master thesis at the IT University of Copenhagen.
This should be considered a work in progress and is not meant for commercial use.


# Installation

- Requires Node.js `>=14.17.0`
- Requires ESLint `>=8`

# Installation and usage 

NB: This parser is mean to be used with the Terraform-ESLint-parser that can be found in another repo:
https://github.com/anguud/Terraform-ESLint-parser

As this is not package is not published, installation through yarn or npm is not possible. 
Instead to include this `eslint-plugin-terraform-rules` package in a project it should be cloned or downloaded and added to the dependencies inside the `package.json` manually. 

Fist clone this repo to you local machine 
Then add the path for this repo to the dependencies in your `package.json` file 

```JSONC

 "dependencies": {
    "eslint-plugin-terraform-rules": "file:../eslint-plugin.terraform-rules"
  },
```

It is recommended to add this to the an overrides configuration to the `.eslintrc` configuration: 

```JSONC
"overrides": [
    {
      "files": [
        "*.tf"
      ], 
      "parser": "terraform-ESLint-parser", // Set the recommended parser.
      "extends": "plugin:terraform-rules/terraform" // sett this rules plugin
    }
  ],
```

This ensures that the rules are only used on Terraform files (`.tf`)

Note that in the above example configuration the Terraform-ESLint-parser has been used. Without this parser the rules won't work with Terraform.


# IDE extension 

It is highly recomended to use this plugin with the VS Code extension ESLint. This can be found on https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
FOr this to work the Terraform extension has to be installed and enabled aswell.
Finally in the ESLint extension setting add `terraform` to the array of languages IDs for which the extension should be applied.
