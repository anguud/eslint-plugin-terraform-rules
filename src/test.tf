resource "google_compute_ssl_policy" "vulnerable_example" { 
              helloWorld = "something"
              name = "production-ssl-policy"
              min_tls_version = "TLS_1_0"
}
