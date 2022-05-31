import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { isIdentifier } from "../../../../utils/ast/guards";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

//TODO: include or not include "default"/not specified. 

export enum MessageIds {
  FOUND_VARIABLE = "found-variable",
  FOUND_VARIABLE_PROFILE= "found-variable-pro",
  FIX_VARIABLE = "fix-variable",
}
type MyRuleOptions = [{ tls: string, pro: string }];


export const encryptedConnections = createRule<MyRuleOptions, MessageIds>({
  name: "my-rule",
  defaultOptions: [{ tls: "\"TLS_1_2\"", pro: "\"RESTRICTED\"" }],
  meta: {
    type: "problem",
    fixable: "code",
    messages: {
      [MessageIds.FOUND_VARIABLE]: `Variable "{{ variableName }}" is deprecated.`,
      [MessageIds.FOUND_VARIABLE_PROFILE]: `Variable "{{ variableName }}" is unsafe.`,
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
  create: (context, [{ tls, pro }]) => {
    let profile: string;
    let version: string;
    return {
      ResourceBlockStatement: (node: any) => {
        let isProfile: boolean = false;
        let isVersion: boolean = false;
        let indexp: number = -1;
        let indexv: number = -1;


        if (node.blocklabel.value == "google_compute_ssl_policy") {
          let counter: number = 0;

          node.body.forEach((argument: any) => {
            if (argument.left.name == "profile") {
              profile = argument.right.value;
              indexp = counter;
              isProfile = true;
            }
            if (argument.left.name == "min_tls_version") {
              version = argument.right.value;
              indexv = counter;
              isVersion = true;
            }
            counter++;
          });

          if (func(profile, version, isProfile, isVersion)) {

            if (indexp == -1) {
              context.report({
                node: node.body[indexv].right,
                messageId: MessageIds.FOUND_VARIABLE,
                data: {
                  variableName: node.body[indexv].right.value,
                },
                suggest: [
                  {
                    messageId: MessageIds.FIX_VARIABLE,
                    data: {
                      orgName: node.body[indexv].right.value,
                      newName: tls,
                    },
                    fix: function (fixer) {
                      return fixer.replaceText(node.body[indexv].right, tls);
                    },
                  },
                ],

              });

            }
            if (indexv == -1) {
              context.report({
                node: node.body[indexp].right,
                messageId: MessageIds.FOUND_VARIABLE_PROFILE,
                data: {
                  variableName: node.body[indexp].right.value,
                },
                suggest: [
                  {
                    messageId: MessageIds.FIX_VARIABLE,
                    data: {
                      orgName: node.body[indexp].right.value,
                      newName: pro,
                    },
                    fix: function (fixer) {
                      return fixer.replaceText(node.body[indexp].right, pro);
                    },
                  },
                ],

              });

            }
            if ((indexv != -1) && (indexp != -1)) {
              context.report({
                node: node.body[indexv].right,
                messageId: MessageIds.FOUND_VARIABLE,
                data: {
                  variableName: node.body[indexv]?.right.value,
                },
                suggest: [
                  {
                    messageId: MessageIds.FIX_VARIABLE,
                    data: {
                      orgName: node.body[indexv].right.value,
                      newName: tls,
                    },
                    fix: function (fixer) {
                      return fixer.replaceText(node.body[indexv].right, tls);
                    },
                  },
                  {
                    messageId: MessageIds.FIX_VARIABLE,
                    data: {
                      orgName: node.body[indexp].right.value,
                      newName: pro,
                    },
                    fix: function (fixer) {
                      return fixer.replaceText(node.body[indexp].right, pro);
                    },
                  },
                ],

              });

            }
          
          }

        }

      },

    };
  },


});

var func = (profile: string, version: string, isProfile: boolean, isVersion: boolean) => {
  if ((version == "TLS_1_1" || version == "TLS_1_0" || isVersion == false) && (isProfile == false || profile == 'COMPATIBLE' || profile == 'MODERN')) {
    return true;
  }
  if (version == "TLS_1_2" && (isProfile == false || profile == 'COMPATIBLE')){
    return true;
  }
  return false;
};
