// import { myRule } from "./rules/terraform-rules/my-rule/_rule";
// import { testRule } from "./rules/terraform-rules/test-rule/test-rule";
// import {dummyRule } from "./rules/terraform-rules/dummy/_rule";
// import { encryptedConnection } from "./rules/terraform-rules/Encrypted_Connections/_rule";

// const myRule = require("./rules/terraform-rules/my-rule/_rule")
// const encryptedConnection = require("./rules/terraform-rules/Encrypted_Connections/_rule")
// const dummyRule = require("./rules/terraform-rules/dummy/_rule")
// const testRule = require("./rules/terraform-rules/test-rule/test-rule")
// const testRule2 = require("./rules/terraform-rules/test-rule2/testRule2")

module.exports = {
  rules: {
    "my-rule": require("./rules/terraform-rules/my-rule/_rule"),
    "encrypted_Connections": require("./rules/terraform-rules/Encrypted_Connections/_rule"),
    "dummy": require("./rules/terraform-rules/dummy/_rule"),
    "test-rule": require("./rules/terraform-rules/test-rule/test-rule"),
    "testRule2": require("./rules/terraform-rules/test-rule2/testRule2")
    // new rules goes here
}
}; 
export {}
