import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

export enum MessageIds {
    BACKUP_FOUND = "backup-found",
    BACKUP_FIX = "backup-fix",
    NO_BACKUP_FOUND = "no-backup-found",
    NO_BACKUP_FIX = "no-backup-fix",
}


export const noPublicAccess = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_sql_database_instance") {
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            if (argument.name === "settings") {
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "TFBlock") {
                                        if (BlockNode.name === "backup_configuration") {
                                            BlockNode.body.forEach((argument: any) => {
                                                if (argument.type === "AssignmentExpression") {
                                                    if (argument.left.name === "enabled") {
                                                        if (argument.right.type === "Identifier") {
                                                            if (argument.right.name !== "true") {
                                                                context.report({
                                                                    node: argument,
                                                                    messageId: MessageIds.BACKUP_FOUND,
                                                                    suggest: [
                                                                        {
                                                                            messageId: MessageIds.BACKUP_FIX,
                                                                            data: {
                                                                                left: argument.right.name,
                                                                                right: argument.left.name
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
    name: 'enable_backup',
    meta: {
        docs: {
            description: "Logging should be enabled for resource: google_compute_backend_service {{ blocklable2 }}",
            recommended: 'error',
            suggestion: true,
        },
        messages: {
            [MessageIds.BACKUP_FOUND]: 'Backup configuration should not be set to false',
            [MessageIds.BACKUP_FIX]: "Change boolean value {{ left }} of {{ right }} to true",
            [MessageIds.NO_BACKUP_FOUND]: "Backup configuration should be declared when working with database instances",
            [MessageIds.NO_BACKUP_FIX]: "Insert enabled backup_configuration block",
        },
        type: 'problem',
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
    },
    defaultOptions: [],
});



