// import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../utils/resolve-docs-route";

/**
 * Progress
 *  [-] Detection
 *  [-] Automatic fix / Suggestions
 *  [-] Reduction of false positives
 *  [-] Fulfilling unit testing
 *  [-] Extensive documentation
 *  [-] Fulfilling configuration options
 */

const MessageIds = {
  FOUND_VARIABLE: "found-variable",
  FIX_VARIABLE: 'Rename "{{ orgName }}" to "{{ newName }}"',
};

const createRule = RuleCreator(resolveDocsRoute);
/**
 * Detects and reports if any expressions assign unsafe values to known vanilla
 * XSS injection sinks.
 */

const encryptedConnection = {
  // name: "Encrypted Conections",
  // defaultOptions: [],
  meta: {
    type: "suggestion",
    fixable: "code",
    // messages: {
    // "found-variable": `assignment "{{ variableName }}" is considered
    // unsecure.`, "fix-variable": `Rename "{{ orgName }}" to "{{ newName }}"`,
    // },
    docs: {
      description: "Flags insecure encryption connections",
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
  create: function (context: { report: (arg0: { node: any; message: string; data: { variableName: any; }; suggest: { messageID: string; data: { orgName: any; newName: string; }; fix: (fixer: { replaceText: (arg0: any, arg1: string) => any; }) => any; }[]; }) => void; }) {
    return {
      Identifier: (node: { value: string; parent: { right: { value: string; }; }; type: any; }) => {
        if (node.value === "min_tls_version") {
          if (
            node.parent?.right.value === "TLS_1_0" ||
            node.parent?.right.value === "TLS_1_1" ||
            node.parent?.right.value === "TLS1_0" ||
            node.parent?.right.value === "TLS1_1"
          ) {
            // apply different fixes for Azure and GCP:
            // in Azure suggest: "TLS1_2"
            // in GCP suggest: "TLS_1_2"
            context.report({
              node: node,
              message: "found insecure encryption {{ variableName }}",
              data: {
                variableName: node.type,
              },
              suggest: [
                {
                  messageID: MessageIds.FIX_VARIABLE,
                  data: {
                    orgName: node.parent.right.value,
                    newName: "TLS1_2",
                  },
                  fix: function (fixer: { replaceText: (arg0: any, arg1: string) => any; }) {
                    return fixer.replaceText(node.parent.right.value, "TLS1_2");
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
};

export { encryptedConnection };
