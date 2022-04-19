import { myRule } from "./rules/terraform-rules/my-rule/_rule";

module.exports = {
  rules: {
    "my-prefix/my-rule": { create: myRule },
    // new rules goes here
  },
  configs: {
    recommended: {
      extends: ["plugin:starter/my-prefix"],
      plugins: ["terraform-rules"],
    },
    ["my-prefix"]: {
      plugins: ["terraform-rules"],
      rules: {
        "terraform-rules/my-prefix/my-rule": ["error"],
      },
    },
  },
};
