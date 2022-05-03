import { testRule } from "./rules/terraform-rules/test-rule/test-rule";
import { enableLog } from "./rules/terraform-rules/enableLogging/rule/rule";
import { encryptedConnections } from "./rules/terraform-rules/enableLogging/rule/rule";
import { enableLog } from "./rules/terraform-rules/enableLogging/rule/rule";


export const rules = {
  "test-rule": testRule,
  "enableLogging": enableLog,
  "encrypted-Connections": encryptedConnections,
  "noPublicAccess": encryptedConnections,
  

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
      "terraform-rules/test-rule": ["error"],
      "terraform-rules/test-rule/enableLogging/rule/rule": ["error"],
      "terraform-rules/test-rule/hardCodedCredentials/rule/rule": ["error"],
      "terraform-rules/test-rule/noPublicAccess/rule/rule": ["error"]
  },
},
}
export { }
