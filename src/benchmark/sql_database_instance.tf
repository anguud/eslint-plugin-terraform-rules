
resource "google_sql_database_instance" "scenario1 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        backup_configuration {
          enabled = false
        }
        ip_configuration {
            require_ssl = false
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
        backup_configuration {
          enabled = true
        }
        ip_configuration {
            require_ssl = true
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


resource "google_sql_database_instance" "scenario3 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        backup_configuration {
          enabled = true
        }
        ip_configuration {
            require_ssl = false
            authorized_networks {
                value           = "0.0.0.0/0"
                name            = "internet"
            } 
        }
    }
}

resource "google_sql_database_instance" "scenario4 - noncompliant" {
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

resource "google_sql_database_instance" "scenario5 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        backup_configuration {
          enabled = false
        }
        ip_configuration {
            require_ssl = true
            authorized_networks {
                value           = "108.12.12.0/24"
                name            = "internet"
            } 
        }
    }
}


resource "google_sql_database_instance" "scenario6 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        ip_configuration {
            authorized_networks {
                value           = var.publicIP.value
                name            = "internet"
            } 
        }
    }
}

resource "google_sql_database_instance" "scenario7 - noncompliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        ip_configuration {
            require_ssl = true
            authorized_networks {
                value           = var.publicIP.value
                name            = "internet"
            } 
        }
    }
}

resource "google_sql_database_instance" "scenario8 - compliant" {
    name                = "production-db-instance"
    database_version    = "POSTGRES"
    settings {
        tier = "db-f1-micro"
        backup_configuration {
          enabled = true
        }
        ip_configuration {
            require_ssl = true
            authorized_networks {
                value           = "158.12.12.0/24"
                name            = "internal"
            }
        }
    }
}

variable "publicIP" {
    value = "0.0.0.0/0"
}