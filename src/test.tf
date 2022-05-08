resource "google_compute_ssl_policy" "vulnerable_example" { 
              helloWorld = "something"
              name = "production-ssl-policy"
              profile = "RESTRICTED"
              min_tls_version = "TLS_1_0"
}
