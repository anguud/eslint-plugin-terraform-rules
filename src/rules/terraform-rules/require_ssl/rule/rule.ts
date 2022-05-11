import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);


export const require_ssl = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                var has_require_ssl = false;
                var has_ip_config = false;
                var settingsIndex = 0
                var ip_cofigIndex = 0
                if (node.blocklabel.value === "google_sql_database_instance") {
                    var resourceBodyCounter = 0
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            if (argument.name.value === "settings") {
                                settingsIndex = resourceBodyCounter;
                                var settingsbodyCounter = 0
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "TFBlock") {
                                        if (BlockNode.name.value === "ip_configuration") {
                                            has_ip_config = true;
                                            ip_cofigIndex = settingsbodyCounter;
                                            BlockNode.body.forEach((element: any) => {
                                                if (element.type === "AssignmentExpression") {
                                                    if (element.operator === "=") {
                                                        if (element.left.type === "Identifier") {
                                                            if (element.left.name === "require_ssl") {
                                                                has_require_ssl = true;
                                                                if (element.right.type === "Identifier") {
                                                                    if (element.right.name === "false") {
                                                                        context.report({
                                                                            node: element.right,
                                                                            messageId: "ssl_false_found",
                                                                            suggest: [
                                                                                {
                                                                                    messageId: "ssl_false_fix",
                                                                                    fix: function (fixer: any) {
                                                                                        return fixer.replaceText(element.right, "true");
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
                                            if (has_ip_config && !has_require_ssl) {
                                                context.report({
                                                    node: node.body[settingsIndex].body[ip_cofigIndex].name,
                                                    messageId: "no_ssl_found",
                                                    suggest: [
                                                        {
                                                            messageId: "no_ssl_fix",
                                                            fix: function (fixer: any ) {
                                                                let enableLogging = `require_ssl = false \n \t\t\t`
                                                                return fixer.insertTextBefore(node.body[settingsIndex].body[ip_cofigIndex].body[0], enableLogging);
                                                            },
                                                        },
                                                    ],
                                                })
                                            }
                                        }
                                    }
                                    settingsbodyCounter++;
                                })

                            }
                        }
                        resourceBodyCounter++;
                    });
                }
            },
        }
    },
    name: 'require_ssl',
    meta: {
        docs: {
            description: 'Require ssl communication to database instance',
            recommended: 'error'
        },
        messages: {
            "no_ssl_found": 'no ssl_requred argument found. SSL connections over all IP should be enforced ',
            "no_ssl_fix": "Insert ssl_requred with value set to true",
            "ssl_false_found": "SSL should be required",
            "ssl_false_fix": "enable SSL by stting enable to true"
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});