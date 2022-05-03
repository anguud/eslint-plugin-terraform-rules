import { createRule } from 'kfesf'

export const encryptedConnections = createRule({
    create(context: any) {
        return {
            AssignmentExpression(node: any) {
                if (node.operator === '=') {
                    if (node.left.property) {
                        if (node.left.property.name == "min_tls_version") { //does it matter if how the lefter property is spelled? So no need to be strict. but should ignore casing.
                            if (node.right.property.name === "TLS1_0" ||
                                node.right.property.name === "TLS1_1" ||
                                node.right.property.name === "TLS_1_0" ||
                                node.right.property.name === "TLS_1_1") {
                                context.report(node, "Unsecure TLS version")
                            };
                        }
                    }
                }
            }
        }
    }
});