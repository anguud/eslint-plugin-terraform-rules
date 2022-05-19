resource "google_bigquery_connection" "scenario1" {
    provider      = google-beta
    name = "bigquery-connection"
    description   = "a riveting description"
    cloud_sql {
        instance_id = "google_sql_database_instance.instance.connection_name"
        database    = "google_sql_database.db.name"
        type        = "MS SQL"
        credential {
          username = "name@email.com"
          password = "1234"
        }
    }
}

resource "google_bigquery_connection" "scenario2" {
    provider      = google-beta
    name = "bigquery-connection"
    cloud_sql {
        instance_id = "google_sql_database_instance.instance.connection_name"
        database    = "google_sql_database.db.name"
        type        = "MySQL"
        credential {
          username = "name@email.com"
          password = "change-me-later"
        }
    }
}

resource "google_bigquery_connection" "scenario3-" {
    provider      = google-beta
    name = "bigquery-connection"
    cloud_sql {
        instance_id = "google_sql_database_instance.instance.connection_name"
        database    = "google_sql_database.db.name"
        type        = "POSTGRES"
        credential {
          username = "name@email.com"
          password = "password"
        }
    }
}
