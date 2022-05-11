import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const noPublicAccess = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_sql_database_instance") {
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            if (argument.name.value === "settings") {
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "TFBlock") {
                                        if (BlockNode.name.value === "ip_configuration") {
                                            BlockNode.body.forEach((element: any) => {
                                                if (element.type === "TFBlock") {
                                                    if (element.name.value === "authorized_networks") {
                                                        element.body.forEach((argument: any)=> {
                                                            if (argument.type === "AssignmentExpression"){
                                                                if (argument.left.name === "value") {
                                                                    if (argument.right.type === "StringLiteral") {
                                                                        if (argument.right.value === "::/0" || argument.right.value === "0.0.0.0/0") {
                                                                            context.report({
                                                                                node: argument.right,
                                                                                messageId: "public_access_found",
                                                                                suggest: [
                                                                                    {
                                                                                        messageId: "public_access_fix",
                                                                                        fix: function (fixer: any) {
                                                                                            return fixer.remove(element);
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
            description: 'Do not allow pubic access to database instance',
            recommended: 'error'
        },
        messages: {
            "public_access_found": 'Public access to database should not be allowed. Deletion of this is recommended. Specify specific ip instead',
            "public_access_fix": "Remove public access to database instance ",
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});