import { gcp_region_backend_enableLog } from "./rules/terraform-rules/enableLogging/gcp_region_backend/rule/rule";
import { gcp_backend_enableLog } from "./rules/terraform-rules/enableLogging/gcp_backend/rule/rule";
import { encryptedConnections } from "./rules/terraform-rules/encryptedConnections/rule/rule";
import { enableBackup } from "./rules/terraform-rules/enableBackup/rule/rule";
import { hardcodedCredentials } from "./rules/terraform-rules/hardCodedCredentials/rule/rule";
import { credentialrule } from "./rules/terraform-rules/credentials/rule/rule";
import { noPublicAccess } from "./rules/terraform-rules/noPublicAccess/rule/rule";


export const rules = {
  "gcpRegionEnableLogging": gcp_region_backend_enableLog,
  "gcpEnableLogging": gcp_backend_enableLog,
  "enableBackup": enableBackup,
  "encryptedConnections": encryptedConnections,
  "hardCodedCredentials": hardcodedCredentials,
  "noPublicAccess": noPublicAccess,  
  "credentialrule": credentialrule,  


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
      "terraform-rules/enableBackup": ["error"],
      "terraform-rules/gcpRegionEnableLogging": ["error"],
      "terraform-rules/gcpEnableLogging": ["error"],
      "terraform-rules/encryptedConnections": ["error"],
      "terraform-rules/hardCodedCredentials": ["error"],
      "terraform-rules/noPublicAccess": ["error"],
      "terraform-rules/credentialrule": ["error"]
  },
},
}
export { }
