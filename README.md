<h1 align="center">eslint-plugin-terraform-rules</h1>


**NB:** This project is part of a master's thesis at the IT University of Copenhagen and it should not be used for any other purpose 

## Installation

to install plugins parser and ruleset run:

```bash
npm i
```

## On changes to rules:

### Rules

Remember to import rules and add them to the configuration in index.ts

Any changes to the terraform-rules project should be followed by the following:
inside the terraform-rules project run:

```bash
npm run build
```

this ensures that changes are reflected in the plugin 

