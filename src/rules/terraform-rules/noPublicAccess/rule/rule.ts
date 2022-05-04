import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const noPublicAccess = createRule({
    create (context : any) {
        return {
            AssignmentExpression(node : any){
                if (node.operator === '='){
                    if (node.left.property){
                        if (node.left.property.name === "value" || node.left.property.name === "network") { 
                            if (node.parentNode?.nodeName === "authorized_networks"){
                                if (node.nodeValue === "0.0.0.0/0" || node.nodeValue === "::/0" || node.nodeValue === "default"){
                                    context.report(node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, "DB exposed to public")
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    name: 'no_public_access',
    meta: {
        docs: {
            description: 'Default ip addresses are unsafe and allows for public access. Unsafe for database instances',
            recommended: 'error'
        },
        messages: {
            error: 'Unsafe for database instances to use default IP-addresses'
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [], 
    },
    defaultOptions: [],
});