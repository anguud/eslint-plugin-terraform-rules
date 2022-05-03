import { isStringLiteral } from "typescript";
import {createRule} from 

export const rule = createRule({
    create (context) {
        return {
            AssignmentExpression(node : Node){
                if (node.operator === '='){
                    if (node.left.property){
                        if (node.left.property.name === "enable") { 
                            if (node.parentNode?.nodeName === "log_config"){
                                if(node.parentNode?.parentNode?.nodeName === "google_compute_region_backend_service"){
                                    if(!node.nodeValue)
                                    context.report(node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, "logging is not enabled ")
                                }

                                if (node.parentNode?.parentNode?. === ""){
                                    context.report(node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, "DB exposed to public")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});