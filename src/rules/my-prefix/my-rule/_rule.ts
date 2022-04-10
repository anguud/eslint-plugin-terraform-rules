// import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";

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

const createRule = RuleCreator;

/**
 * Detects and reports if any expressions assign unsafe values to known vanilla
 * XSS injection sinks.
 */
export const myRule = createRule<MyRuleOptions, MessageIds>({
  name: "fs",
  defaultOptions: [{ variableName: "helloWorld" }],
  meta: {
    type: "suggestion",
    fixable: "code",
    messages: {
      [MessageIds.FOUND_VARIABLE]: `Variable "{{ variableName }}" is not named correctly.`,
      [MessageIds.FIX_VARIABLE]: `Rename "{{ orgName }}" to "{{ newName }}"`,
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
  create: (context, [{ variableName }]) => {
    return {
      BlockStatement: (node) => {
        context.report({
          node: node,
          messageId: MessageIds.FOUND_VARIABLE,
          data: {
            variableName: node.type,
          },
          suggest: [
            {
              messageId: MessageIds.FIX_VARIABLE,
              data: {
                orgName: node.type,
                newName: variableName,
              },
              fix(fixer) {
                return fixer.replaceText(node, variableName);
              },
            },
          ],
        });
      },
    };
  },
});
