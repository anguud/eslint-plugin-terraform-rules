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

const createRule = RuleCreator(resolveDocsRoute);
/**
 * Detects and reports if any expressions assign unsafe values to known vanilla
 * XSS injection sinks.
 */
export const myRule = createRule({
  name: "attempt",
  defaultOptions: [{ variableName: "helloWorld" }],
  meta: {
    type: "suggestion",
    fixable: "code",
    messages: {
      "found-variable": `Variable "{{ variableName }}" is not named correctly.`,
      "fix-variable": `Rename "{{ orgName }}" to "{{ newName }}"`,
    },
    docs: {
      description: "This is the first test rule",
      recommended: "error",
      suggestion: true,
    },
    hasSuggestions: true,
    schema: [
      {
        type: "object",
        items: {
          variableName: { type: "string", required: true },
        },
      },
    ],
  },
  create: (context) => {
    return {
      ResourceBlockStatement: (node) => {
        context.report({
          node: node,
          messageId: MessageIds.FOUND_VARIABLE,
          data: {
            variableName: node,
          },
          suggest: [
            {
              messageId: MessageIds.FIX_VARIABLE,
              data: {
                orgName: node,
                newName: "hej fra blokken",
              },
              fix(fixer) {
                return fixer.replaceText(node, "hejFraBlokken");
              },
            },
          ],
        });
      },
    };
  },
});
