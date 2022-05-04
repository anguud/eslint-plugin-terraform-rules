import { ESLintUtils } from "@typescript-eslint/utils";
import {hardcodedCredentials} from '../rule/rule';

const ruleTester = new ESLintUtils.RuleTester( {
    parser: 'tf-parser'
});

ruleTester.run('encryptedConnection',hardcodedCredentials,{
    valid: [
        { code: "NOT SURE" }, 
    ],
    invalid: [
        { code: "password = changemelater", errors: [{messageId: "error"}] },
        { code: "username = some@email.com", errors: [{messageId: "error"}] },
        { code: "password = 12345678", errors: [{messageId: "error"}] }]
});