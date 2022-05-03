import { isStringLiteral } from "typescript";
import {createRule} from

export const rule = createRule({
    create (context) {
        return {
            AssignmentExpression(node : Node){
                if (node.operator === '='){
                    if (node.left.property){
                        if (node.left.property.name == "password" || node.left.property.name == "username" ) { //does it matter if how the lefter property is spelled? So no need to be strict. but should ignore casing.
                            if (node.right.property.type.isStringLiteral){
                                    context.report(node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, "Unsecure TLS version")
                                };

                        }
                        
                    }
                }
            }
        }
    }
});