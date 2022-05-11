import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const hardcodedCredentials = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_bigquery_connection") {
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            if (argument.name.value === "cloud_sql") {
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "TFBlock") {
                                        if (BlockNode.name.value === "credential") {
                                            BlockNode.body.forEach((element: any) => {
                                                if (element.type === "AssignmentExpression") {
                                                    if (element.left.type === "Identifier") {
                                                        if (element.left.name === "password") {
                                                            if (element.right.type === "StringLiteral") {
                                                                context.report({
                                                                    node: element.right,
                                                                    messageId: "hardcoded_credentials_found",
                                                                    suggest: [
                                                                        {
                                                                            messageId: "hardcoded_credentials_fix",
                                                                            fix: function (fixer: any) {
                                                                                return fixer.remove(element.right);
                                                                            },
                                                                        },
                                                                    ],
                                                                })
                                                            }
                                                        }
                                                    }

                                                }
                                            });
                                        }
                                    }
                                })

                            }
                        }
                    });
                }
            },
        }
    },
    name: 'no_hard_coded_credentials',
    meta: {
        docs: {
            description: 'Do not include hard coded credentials',
            recommended: 'error'
        },
        messages: {
            "hardcoded_credentials_found": 'Credentials should not be hardcoded into source code',
            "hardcoded_credentials_fix": "No autofix for this. Remove hardcoded credentials",
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