"use strict";

import * as ES from "eslint";

import rule = require("./_rule");

const ruleTester = new ES.RuleTester();

ruleTester.run("my-rule", rule, {
  valid: [
    {
      code: "var foo = true",
      options: [{ allowFoo: true }],
    },
  ],

  invalid: [
    {
      code: `resource "google_compute_ssl_policy" "vulnerable_example" { 
              helloWorld = "something"
              name = "production-ssl-policy"
              profile = "MODERN"
              min_tls_version = "TLS_1_0"
          }`,
      errors: [{ message: "Unexpected invalid variable." }],
    },
    {
      code: `resource "google_compute_ssl_policy" "vulnerable_example" { 
              helloWorld = "something"
              name = "production-ssl-policy"
              profile = "MODERN"
              min_tls_version = "TLS_1_0"
          }`,
      errors: [{ message: /^Unexpected.+variable/ }],
    },
  ],
});
