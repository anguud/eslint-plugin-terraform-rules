import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const encryptedConnections = createRule({
    create(context: any) {
        return {
            AssignmentExpression(node: any) {
                if (node.operator === '=') {
                    console.log('if it is equal')
                    console.log(node.left)
                    console.log(node.type)
                    console.log(node.name)
                    console.log(node.right.value)
                    if (node.type == 'Identifier' && node.name == 'min_tls_version') {
                        console.log('identifier + mintæe-s')
                        if (node.right.value === 'TLS_1_0'){
                            console.log('Youre a god damn genious')
                        }/*
                        console.log('if left exist')
                        if (node.left.property.name == 'min_tls_version') { //does it matter if how the lefter property is spelled? So no need to be strict. but should ignore casing.
                            console.log('if min tls')
                            if (node.right.property.name === "TLS1_0" ||
                                node.right.property.name === "TLS1_1" ||
                                node.right.property.name === "TLS_1_0" ||
                                node.right.property.name === "TLS_1_1") {
                                    console.log('if include vulnerablity')
                                context.report(node, "Unsecure TLS version")
                            };
                        }*/ 
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