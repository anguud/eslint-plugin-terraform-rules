import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const credentialrule = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_sql_user") {
                    node.body.forEach((argument: any) => {
                        if (argument.type === "AssignmentExpression") {
                            if (argument.left.type === "Identifier") {
                                if (argument.left.name === "password") {
                                    if (argument.right.type === "StringLiteral") {
                                        context.report({
                                            node: argument.right,
                                            messageId: "hardcoded_credentials_found",
                                            suggest: [
                                                {
                                                    messageId: "hardcoded_credentials_fix",
                                                    fix: function (fixer: any) {
                                                        return fixer.remove(argument.right);
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