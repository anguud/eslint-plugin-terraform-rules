import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { profileEnd } from "console";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

//TODO: include or not include "default"/not specified. 

export enum MessageIds {
    FOUND_VARIABLE = "found-variable",
    FIX_VARIABLE = "fix-variable",
}
  


export const encryptedConnections = createRule({
    create(context: any) {
        let profile: string;
        let version: string;
        let checkedp: boolean;
        let checkedv: boolean;
        return {
            AssignmentExpression(node: any) {
                if (node.operator === '=') {
                    if (node.parent.blocklabel.value == "google_compute_ssl_policy"){
                        if (node.left.name == "profile"){
                            profile = node.right.value;
                            checkedp = true;
                        }
                        if (node.left.name == "min_tls_version"){
                            version = node.right.value;
                            checkedv = true;
                        }
                    }
                    console.log(node.parent.blocklabel.value)
                    console.log("profile :" + profile)
                    console.log("version :" + version)
                    console.log("checked : " + checkedp + checkedv)
                    
                }
                if (func(profile, version, checkedp, checkedv)){

                }
                
                
            }
            
        }
    },
    name: 'encrypted_connections',
    meta: {
        docs: {
            description: 'TLS-1.0 and TLS-1.1 is deprecated. Use TLS-1.2 or above',
            recommended: 'error'
        },
        messages: {
            error: 'enable logs in backend severices'
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});

var func = (profile: string, version: string, checkedp: boolean, checkedv: boolean) => {
    if ((version == "TLS1_0" || version == "TLS1_1" || version == "TLS_1_1" || version == "TLS_1_0" || version == null) && (profile == null || profile == 'COMPATIBLE' || profile == 'MODERN') && (checkedp && checkedv)){
        return true;
    }
};
