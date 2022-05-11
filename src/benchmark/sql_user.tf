resource "google_sql_user" "scenario1 - noncompliant" {
  name     = "admin"
  instance = google_sql_database_instance.main.name
  password = "changeme"
}

resource "google_sql_user" "scenario2 - noncompliant" {
  name     = "admin"
  instance = google_sql_database_instance.main.name
  password = "1234"
}

resource "google_sql_user" "scenario3 - noncompliant" {
  name     = "admin"
  instance = google_sql_database_instance.main.name
  password = var.password.name
}

resource "google_sql_user" "scenario4 - compliant" {
  name     = "admin"
  instance = google_sql_database_instance.main.name
}

variable "password" { 
    name = "change-me-later"
}