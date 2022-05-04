import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const encryptedConnections = createRule({
    create(context: any) {
        return {
            AssignmentExpression(node: any) {
                if (node.operator === '=') {
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