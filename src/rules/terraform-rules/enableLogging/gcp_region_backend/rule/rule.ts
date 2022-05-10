import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

export enum MessageIds {
    LOG_FOUND = "log-found",
    LOG_FIX = "log-fix",
    NO_LOG_FOUND = "no-log-found",
    NO_LOG_FIX = "no-log-fix",
}
type MyRuleOptions = []; //NO CLUE 


export const gcp_region_backend_enableLog = createRule<MyRuleOptions,MessageIds>({
    name: 'enable_log',
    meta: {
        docs: {
            description: "Logging should be enabled for resource: google_compute_region_backend_service {{ blocklable2 }}",
            recommended: 'error',
            suggestion: true,
        },
        messages: {
            [MessageIds.LOG_FOUND]: 'Logs should not be declared to false in GCP region backend services',
            [MessageIds.LOG_FIX]: "Change boolean value {{ left }} of {{ right }} to true",
            [MessageIds.NO_LOG_FOUND]: "Logs should be declared and enabled in GCP region backend severices",
            [MessageIds.NO_LOG_FIX]: "Insert log_config block",
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [], // WHAT IS THIS LOUISE
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_compute_region_backend_service") {
                    var hasLogConfig: boolean = false
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            console.log("TFBlock")
                            if (argument.name === "log_config") {
                                hasLogConfig = true
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "AssignmentExpression") {
                                        if (BlockNode.left.type === "Identifier") {
                                            if (BlockNode.left.name === "enable") {
                                                if (BlockNode.right.type === "Identifier") {
                                                    if (BlockNode.right.name !== "true") {
                                                        context.report({
                                                            node: BlockNode,
                                                            messageId: MessageIds.LOG_FOUND,
                                                            suggest: [
                                                                {
                                                                    messageId: MessageIds.LOG_FIX,
                                                                    data: {
                                                                        left: BlockNode.right.name,
                                                                        right: BlockNode.left.name
                                                                    },
                                                                    fix: function (fixer: { replaceText: (arg0: any, arg1: string) => any; }) {
                                                                        return fixer.replaceText(BlockNode.right, "true");
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
                                )

                            }
                        } 
                    });
                    if (!hasLogConfig){
                        context.report({
                            node: node,
                            messageId: MessageIds.NO_LOG_FOUND,
                            suggest: [
                                {
                                    messageId: MessageIds.NO_LOG_FIX,
                                    fix: function (fixer: { insertTextAfter: (arg0: any, arg1: string) => any; }) {
                                        let enableLogging = `\n\n  log_config {\n    enable = true\n  }`
                                        return fixer.insertTextAfter(node.body[node.body.length-1], enableLogging);
                                    },
                                },
                            ],
                        })
                    }
                }
            },
        }
    },
});