import { ESLintUtils } from "@typescript-eslint/utils";
import { encryptedConnections } from '../rule/rule';

const ruleTester = new ESLintUtils.RuleTester( {
    parser: 'tf-parser'
});
/*
ruleTester.run('encryptedConnection',encryptedConnections,{
    valid: [
        { code: "min_tls_version = TLS_1_2" }, // escape quotations... 
        { code: "min_tls_version = TLS1_2" }
    ],
    invalid: [
        { code: "min_tls_version = TLS_1_1", errors: [{messageId: "error"}] },
        { code: "min_tls_version = TLS1_1", errors: [{messageId: "error"}] },
        { code: "min_tls_version = TLS_1_0", errors: [{messageId: "error"}] },
        { code: "min_tls_version = TLS1_0", errors: [{messageId: "error"}] }]
});*/