resource "google_bigquery_connection" "scenario1" {
    provider      = google-beta
    friendly_name = "bigquery-connection"
    description   = "a riveting description"
    cloud_sql {
        instance_id = "google_sql_database_instance.instance.connection_name"
        database    = "google_sql_database.db.name"
        type        = "POSTGRES"
        credential {
          username = "name@email.com"
          password = "change-me-later"
        }
    }
}
