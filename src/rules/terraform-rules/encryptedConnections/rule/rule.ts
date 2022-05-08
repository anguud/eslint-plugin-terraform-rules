import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { isIdentifier } from "../../../../utils/ast/guards";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

//TODO: include or not include "default"/not specified. 

export enum MessageIds {
    FOUND_VARIABLE = "found-variable",
    FIX_VARIABLE = "fix-variable",
}
type MyRuleOptions = [{ variableName: string }];


export const encryptedConnections = createRule<MyRuleOptions, MessageIds>({
  name: "my-rule",
  defaultOptions: [{ variableName: "\"TLS_1_2\"" }],
  meta: {
    type: "problem",
    fixable: "code",
    messages: {
      [MessageIds.FOUND_VARIABLE]: `Variable "{{ variableName }}" is not named correctly.`,
      [MessageIds.FIX_VARIABLE]: `Rename "{{ orgName }}" to "{{ newName }}"`,
    },
    docs: {
      description: "blabla",
      recommended: "error",
      suggestion: true,
    },
    hasSuggestions: true,
    schema: [],
  },
  create: (context, [{ variableName }]) => {
    return {
      Identifier: (node) => {
        console.log(node);
      },

      AssignmentExpression: (node: any) => {
        // In case the variable does not have an id that is an identifier
        // (defensive programming) or if the variable already has the correct
        // name, then we can bail out early.
        if (node.left.name == "min_tls_version") {
          if (!(node.right.value == "TLS_1_2")){
            context.report({
                node: node,
                messageId: MessageIds.FOUND_VARIABLE,
                data: {
                  variableName: node.right.value
                },
                suggest: [
                  {
                    messageId: MessageIds.FIX_VARIABLE,
                    data: {
                      orgName: node.right.value,
                      newName: variableName,
                    },
                    fix(fixer) {
                      console.log("right : " + node.right)
                      console.log("varname : " + variableName)
                      console.log(fixer.replaceText(node.right, variableName))
                      console.log("Bjørn")

                      return fixer.replaceText(node.right, variableName);
                    },
                  },
                ],
              });

          }
        }

      },
    };
  },
});
