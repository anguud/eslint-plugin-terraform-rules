const testRule = {
    create(context) {
        return {
            CallExpression(node) {
                if (node.parent.name === 'resource') {
                    context.report({
                        node: node,
                        message: "this is a test"
                    });
                }
            }
        }
    },
}
export { testRule }