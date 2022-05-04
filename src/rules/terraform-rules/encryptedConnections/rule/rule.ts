import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { profileEnd } from "console";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const encryptedConnections = createRule({
    create(context: any) {
        let profile: string;
        let version: string;
        return {
            AssignmentExpression(node: any) {
                if (node.operator === '=') {
                    if (node.parent.blocklabel.value == "google_compute_ssl_policy"){
                        if (node.left.name == "profile"){
                            profile = node.right.value;
                        }
                        if (node.left.name == "min_tls_version"){
                            version = node.right.value;
                        }
                    }
                    console.log(node.parent.blocklabel.value)
                    console.log("profile :" + profile)
                    console.log("version :" + version)
                    
                    if (node.left.name == "min_tls_version") {
                        if (node.right.value == "TLS1_0" ||
                            node.right.value === "TLS1_1" ||
                            node.right.value === "TLS_1_0" ||
                            node.right.value === "TLS_1_1") {
                            context.report(node, "Insecure TLS version")
                        };
                    }
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
            error: 'TLS-1.0 and TLS-1.1 is deprecated'
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});