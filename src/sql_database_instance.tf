
resource "google_sql_database_instance" "scenario1 - noncompliant" {
    name                = "production-db-instance"
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

resource "google_sql_database_instance" "scenario2 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        ip_configuration {
            authorized_networks {
                value           = "108.12.12.0/24"
                name            = "internal"
            }
            authorized_networks {
                value           = "::/0"
                name            = "internet"
            } 
        }
    }
}

resource "google_sql_database_instance" "scenario3 - compliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        ip_configuration {
            authorized_networks {
                value           = "108.12.12.0/24"
                name            = "internal"
            }
        }
    }
}