resource "google_compute_ssl_policy" "scenario1 - noncompliant" {
              name = "production-ssl-policy"
              profile = "COMPATIBLE"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "scenario2 - noncompliant" { 
              name = "production-ssl-policy"
              profile = "MODERN"
              min_tls_version = "TLS_1_1"
}

resource "google_compute_ssl_policy" "scenario3 - noncompliant" { 
              name = "production-ssl-policy"
              profile = "COMPATIBLE"
}

resource "google_compute_ssl_policy" "scenario4 - noncompliant" { 
              name = "production-ssl-policy"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "scenario5 - noncompliant" { 
              name = "production-ssl-policy"
              profile = "COMPATIBLE"
              min_tls_version = var.deprecated_tls
}

resource "google_compute_ssl_policy" "scenario6 - compliant" { 
              name = "production-ssl-policy"
              profile = "RESTRICTED"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "scenario7 - compliant" { 
              name = "production-ssl-policy"
              profile = "COMPATIBLE"
              min_tls_version = "TLS_1_2"
}


resource "google_compute_ssl_policy" "scenario8 - compliant" { 
              name = "production-ssl-policy"
              profile = "RESTRICTED"
              min_tls_version = var.deprecated_tls
}

variable "deprecated_tls" { 
    type = string
}