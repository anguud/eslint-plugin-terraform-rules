//EncryptedConnections

resource "google_compute_ssl_policy" "vulnerable_example1" { 
              name = "production-ssl-policy"
              profile = "COMPATIBLE"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "vulnerable_example2" { 
              name = "production-ssl-policy"
              profile = "MODERN"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "safe_example" { 
              name = "production-ssl-policy"
              profile = "RESTRICTED"
              min_tls_version = "TLS_1_0"
}

resource "google_compute_ssl_policy" "best_example" { 
              name = "production-ssl-policy"
              profile = "RESTRICTED"
              min_tls_version = "TLS_1_2"
}

// noPublicAccess

resource "google_sql_database_instance" "postgres" {
    name                = "postgress-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        ip_configuration {
            authorized_networks {
                value           = "108.12.12.0/24"
                name            = "internal"
            }
            authorized_networks {
                value           = "0.0.0.0/0"
                name            = "internet"
            } 
        }
    }
}


//enableLogging

resource "google_compute_region_backend_service" "bad_example" {
  name                            = "logging-test"
  region                          = "us-central1"
  health_checks                   = [google_compute_region_health_check.region.id]
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTP"

  log_config {
    enable = false
  }
}

resource "google_compute_region_backend_service" "vulnerable_to_educate" {
  name                            = "logging-test"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"
}

resource "google_compute_region_backend_service" "withlogs" {
  name                            = "logging-test"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"

  log_config {
    enable = true
  }
}

//hardCodedCredentials
// https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/bigquery_connection

resource "google_bigquery_connection" "vulnerable" {
    provider      = google-beta
    friendly_name = "bigquery-connection"
    description   = "a riveting description"
    cloud_sql {
        instance_id = google_sql_database_instance.instance.connection_name
        database    = google_sql_database.db.name
        type        = "POSTGRES"
        credential {
          username = "name@email.com"
          password = "change-me-later"
        }
    }
}
