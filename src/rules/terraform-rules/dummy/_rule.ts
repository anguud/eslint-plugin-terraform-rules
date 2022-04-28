const dummyRule = {
    create(context: { report: (arg0: { node: any; message: string }) => void }) {
        return {
            CallExpression(node: { callee: { name: string; }; }) {
                if (node.callee.name === 'getPayments') {
                    context.report({
                        node: node,
                        message: "Dette er en fejl!! "
                    })
                }
            }
            // context.report({
            //     node: node,
            //     message: "Missing semicolon",
            //     fix: function(fixer) {
            //         return fixer.insertTextAfter(node, ";");
            //     }
            // });
        }
}
}

export {dummyRule}