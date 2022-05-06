import { ESLintUtils } from "@typescript-eslint/utils";
import {noPublicAccess } from '../rule/rule';
/*
const ruleTester = new ESLintUtils.RuleTester( {
    parser: 'tf-parser'
});

ruleTester.run('noPublicAccess',noPublicAccess,{
    valid: [
        { code: "NOT SURE" }, 
    ],
    invalid: [
        { code: "value = 0.0.0.0/0", errors: [{messageId: "error"}] },
        { code: "value = ::/0", errors: [{messageId: "error"}] },
        { code: "value = default", errors: [{messageId: "error"}] }]
});
*/
