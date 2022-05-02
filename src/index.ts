import { myRule } from "./rules/terraform-rules/my-rule/_rule";
import { testRule } from "./rules/terraform-rules/test-rule/test-rule";
import { testRule2 } from "./rules/terraform-rules/test-rule2/test-rule2";
import {dummyRule } from "./rules/terraform-rules/dummy/_rule";
import { encryptedConnection } from "./rules/terraform-rules/Encrypted_Connections/_rule";

// const myRule = require("./rules/terraform-rules/my-rule/_rule")
// const encryptedConnection = require("./rules/terraform-rules/Encrypted_Connections/_rule")
// const dummyRule = require("./rules/terraform-rules/dummy/_rule")
// const testRule = require("./rules/terraform-rules/test-rule/test-rule")
// const testRule2 = require("./rules/terraform-rules/test-rule2/testRule2")

// module.exports = {
//   rules: {
//     "my-rule": require("./rules/terraform-rules/my-rule/_rule"),
//     "encrypted_Connections": require("./rules/terraform-rules/Encrypted_Connections/_rule"),
//     "dummy": require("./rules/terraform-rules/dummy/_rule"),
//     "test-rule": require("./rules/terraform-rules/test-rule/test-rule"),
//     "testRule2": require("./rules/terraform-rules/test-rule2/test-rule2")
//     // new rules goes here
// }
// }; 

export const rules = {
  "my-rule": myRule,
  "encrypted_Connections": encryptedConnection,
  "dummy": dummyRule,
  "test-rule": testRule,
  "testRule2": testRule2
  // new rules goes here
}

export const configs = {
  recommended: {
    plugins: ["terraform-rules"],
    extends: [
      "plugin:terraform-rules/terraform"
    ],
  },
  terraform: {
    plugins: ["terraform-rules"],
    rules: {
      "terraform-rules/my-rule": ["error"],
      "terraform-rules/encrypted_Connections": ["error"],
      "terraform-rules/dummy": ["error"],
      "terraform-rules/test-rule": ["error"],
      "terraform-rules/testRule2": ["error"],
  },
},
}
export { }
