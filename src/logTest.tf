resource "google_compute_region_backend_service" "example" {
  name                            = "example"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"

  log_config {
    enable = false
  }
}

resource "google_compute_region_backend_service" "example" {
  name                            = "example"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"
}

resource "google_compute_backend_service" "example" {
  name                            = "example"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"

  log_config {
    enable = false
  }
}
resource "google_compute_backend_service" "example" {
  name                            = "example"
  region                          = "us-central1"
  connection_draining_timeout_sec = 10
  session_affinity                = "CLIENT_IP"
  load_balancing_scheme           = "EXTERNAL"
  protocol                        = "HTTPS"
}
