import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

export const enableLog = createRule({
    create (context: any) {
        return {
            AssignmentExpression(node : any){
                if (node.operator === '='){
                    if (node.left.property){
                        if (node.left.property.name === "enable") { 
                            if (node.parent?.nodeName === "log_config"){
                                if(node.parent?.parent?.nodeName === "google_compute_region_backend_service"){
                                    if(!node.nodeValue)
                                    context.report(node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, "logging is not enabled ")
                                }


                            }
                        }
                    }
                }
            }
        }
    },
    name: 'enable_log',
    meta: {
        docs: {
            description: 'enable logs in backend severices',
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