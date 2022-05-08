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
  defaultOptions: [{ variableName: "TLS_1_2" }],
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
    let profile: string;
    let version: string;
    let isProfile: boolean;
    let isVersion: boolean;
    let checkedp: boolean;
    let checkedv: boolean;
    return {
      Identifier: (node) => {
        console.log("HERE GOES THE FIRST " + node.name)
        if (node.name == "profile") {
          isProfile = true;
        }
        if (node.name == "min_tls_version") {
          isVersion = true;
        }
      },

      AssignmentExpression: (node: any) => {
        // In case the variable does not have an id that is an identifier
        // (defensive programming) or if the variable already has the correct
        // name, then we can bail out early.
        console.log(func(profile, version, isProfile, isVersion))
          if (func(profile, version, isProfile, isVersion)) {
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
                  fix: function (fixer) {
                    return fixer.replaceText(node.right, variableName);
                  },
                },
              ],
            });

          }
        

      },
    };
  },


});

var func = (profile: string, version: string, isProfile: boolean, isVersion: boolean) => {
  if ((version == "TLS1_0" || version == "TLS1_1" || version == "TLS_1_1" || version == "TLS_1_0" || isVersion == false) && (isProfile == false || profile == 'COMPATIBLE' || profile == 'MODERN')) {
    return true;
  }
  return false;
};
