import { RuleCreator } from "@typescript-eslint/utils/dist/eslint-utils";
import { resolveDocsRoute } from "../../../../utils/resolve-docs-route";

const createRule = RuleCreator(resolveDocsRoute);

export enum MessageIds {
    BACKUP_FOUND = "backup-found",
    BACKUP_FIX = "backup-fix",
    NO_BACKUP_FOUND = "no-backup-found",
    NO_BACKUP_FIX = "no-backup-fix",
}


export const enableBackup = createRule({
    create(context: any) {
        return {
            ResourceBlockStatement(node: any) {
                if (node.blocklabel.value === "google_sql_database_instance") {
                    var hasBackupConfig : boolean = false
                    var sql_body_counter = 0;
                    node.body.forEach((argument: any) => {
                        if (argument.type === "TFBlock") {
                            if (argument.name.value === "settings") {
                                var settingsIndex = sql_body_counter
                                argument.body.forEach((BlockNode: any) => {
                                    if (BlockNode.type === "TFBlock") {
                                        if (BlockNode.name.value === "backup_configuration") {
                                            hasBackupConfig = true
                                            BlockNode.body.forEach((argument: any) => {
                                                if (argument.type === "AssignmentExpression") {
                                                    if (argument.left.name === "enabled") {
                                                        (argument.right.type === "Identifier")
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
                                                                                return fixer.replaceText(argument.right, "true");
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
                                if (!hasBackupConfig){
                                    context.report({
                                        node: node.blocklabel,
                                        messageId: MessageIds.NO_BACKUP_FOUND,
                                        suggest: [
                                            {
                                                messageId: MessageIds.NO_BACKUP_FIX,
                                                fix: function (fixer: { insertTextAfter: (arg0: any, arg1: string) => any; }) {
                                                    let enableBackup = `\n\n \tbackup_configuration {\n   \t \tenabled = true\n  \t}`
                                                    return fixer.insertTextAfter(node.body[settingsIndex].body[node.body[settingsIndex].body.length-1], enableBackup);
                                                },
                                            },
                                        ],
                                    })
                                }

                            }
                        }
                        sql_body_counter++
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



