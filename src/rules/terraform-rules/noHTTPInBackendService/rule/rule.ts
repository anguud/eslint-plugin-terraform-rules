import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const noHTTPInBackendService = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_compute_backend_service") {
                    node.body.forEach((argument: any) => {
                        if (argument.type === "AssignmentExpression") {
                            if (argument.operator === "=") {
                                if (argument.left.type === "Identifier") {
                                    if (argument.left.name === "protocol") {
                                        if (argument.right.type === "StringLiteral") {
                                            if (argument.right.value === "HTTP"){
                                                context.report({
                                                    node: argument.right,
                                                    messageId: "HTTP_found",
                                                    suggest: [
                                                        {
                                                            messageId: "HTTP_fix",
                                                            fix: function (fixer: any) {
                                                                return fixer.replaceText(argument.right, "\"HTTPS\"");
                                                            },
                                                        },
                                                    ],
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            },
        }
    },
    name: 'No_HTTP_In_Backend_Service',
    meta: {
        docs: {
            description: 'Do not include hard coded credentials',
            recommended: 'error'
        },
        messages: {
            "HTTP_found": 'Protocol should not allow HTTP connection.',
            "HTTP_fix": "No autofix for this. Remove hardcoded credentials",
            "insert_credentials": "Missing credentials block",
            "start_credentials_block": "Insert outline for credentialsblock",
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});