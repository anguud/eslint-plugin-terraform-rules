
resource "google_compute_region_backend_service" "scenario1 - noncompliant" {
  name                            = "logging-test"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTP"

  log_config {
    enable = false
  }
}

resource "google_compute_region_backend_service" "scenario2 - noncompliant" {
  name                            = "logging-test"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"
}

resource "google_compute_region_backend_service" "scenario3 - compliant" {
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

