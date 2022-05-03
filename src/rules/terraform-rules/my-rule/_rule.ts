// import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";

import { resolveDocsRoute } from "../../../utils/resolve-docs-route";

/**
 * Progress
 *  [X] Detection
 *  [X] Automatic fix / Suggestions
 *  [X] Reduction of false positives
 *  [-] Fulfilling unit testing
 *  [X] Extensive documentation
 *  [X] Fulfilling configuration options
 */

type MyRuleOptions = [{ variableName: string }];

export enum MessageIds {
  FOUND_VARIABLE = "found-variable",
  FIX_VARIABLE = "fix-variable",
}

// const createRule = RuleCreator(resolveDocsRoute);
// /**
//  * Detects and reports if any expressions assign unsafe values to known vanilla
//  * XSS injection sinks.
//  */
// export const myRule = createRule({
//   name: "attempt",
//   defaultOptions: [{ variableName: "helloWorld" }],
//   meta: {
//     type: "suggestion",
//     fixable: "code",
//     messages: {
//       "found-variable": `Variable "{{ variableName }}" is not named correctly.`,
//       "fix-variable": `Rename "{{ orgName }}" to "{{ newName }}"`,
//     },
//     docs: {
//       description: "This is the first test rule",
//       recommended: "error",
//       suggestion: true,
//     },
//     hasSuggestions: true,
//     schema: [
//       {
//         type: "object",
//         items: {
//           variableName: { type: "string", required: true },
//         },
//       },
//     ],
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
// });

/** @type {import('eslint').Rule.RuleModule} */
export const myRule = {
  meta: {
    type: "suggestion",
    messages: {
      [MessageIds.FOUND_VARIABLE]: `Blockabels "{{ blocklabel1 }}" and "{{ blocklabel2 }}" are not named correctly.`,
      [MessageIds.FIX_VARIABLE]: `Rename "{{ orgName }}" to "{{ newName }}"`,
    },
    docs: {
      description: "disallow unnecessary semicolons",
      category: "Possible Errors",
      recommended: true,
      url: "https://eslint.org/docs/rules/no-extra-semi",
    },
    hasSuggestions: true,
    fixable: "code",
    schema: [], // no options
  },
  create: function (context: {
    report: (arg0: {
      node: any;
      messageId: MessageIds;
      data: {  blocklabel1: any , blocklabel2: any};
      suggest: {
        messageId: MessageIds;
        data: { orgName: any; newName: string };
        fix(fixer: any): any;
      }[];
    }) => void;
  }) {
    return {
      ResourceBlockStatement: (node: any) => {
        context.report({
          node: node,
          messageId: MessageIds.FOUND_VARIABLE,
          data: {
            blocklabel1: node.blocklabel.value,
            blocklabel2: node.blocklabel2.value,
          },
          suggest: [
            {
              messageId: MessageIds.FIX_VARIABLE,
              data: {
                orgName: node.blocklabel.value,
                newName: "hejFraBlokken",
              },
              fix(fixer: { replaceText: (arg0: any, arg1: string) => any }) {
                return fixer.replaceText(node.blocklabel, "hejFraBlokken");
              },
            },
          ],
        });
      },
    };
  },
};
