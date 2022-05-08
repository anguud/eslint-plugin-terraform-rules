import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

export const hardcodedCredentials = createRule({
    create (context: any) {
        return {
            AssignmentExpression(node : any){
                if (node.operator === '='){
                    if (node.left.property){
                        if (node.left.property.name == "password" || node.left.property.name == "username" ) { //does it matter if how the lefter property is spelled? So no need to be strict. but should ignore casing.
                            if (node.right.property.type.isStringLiteral){
                               
                            };

                        }
                        
                    }
                }
            }
        }
    },
    name: 'no_hard_coded_credentials',
    meta: {
        docs: {
            description: 'Do not include hard coded credentials',
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