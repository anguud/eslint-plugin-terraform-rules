import { isStringLiteral } from "typescript";
import {createRule} from

export const rule = createRule({
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
    }
});