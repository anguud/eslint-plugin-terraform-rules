export {};
// module.exports = function testRule(context) {
//   meta: {
//     type: "suggestion",

//     docs: {
//       description: "disallow unnecessary semicolons",
//       category: "Possible Errors",
//       recommended: true,
//       url: "https://eslint.org/docs/rules/no-extra-semi",
//     },
//     fixable: "code",
//     schema: [], // no options
//   },
//   create: (context) => {
//     return {
//       ResourceBlockStatement: (node) => {
//         context.report({
//           node: node,
//           messageId: MessageIds.FOUND_VARIABLE,
//           data: {
//             variableName: node,
//           },
//           suggest: [
//             {
//               messageId: MessageIds.FIX_VARIABLE,
//               data: {
//                 orgName: node,
//                 newName: "hej fra blokken",
//               },
//               fix(fixer) {
//                 return fixer.replaceText(node, "hejFraBlokken");
//               },
//             },
//           ],
//         });
//       },
//     };
//   },
// };

// export {};
