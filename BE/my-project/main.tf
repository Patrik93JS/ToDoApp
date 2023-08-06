terraform {
  required_providers {
    qovery = {
      source = "qovery/qovery"
    }
  }
}

provider "qovery" {
  token = "qov_3oSOjCUESe1AEvqSsRXTKp6f5neVWis8tbzVDGGZ01V63xyUf6BfneJ_302625401"
}

resource "qovery_aws_credentials" "my_aws_creds" {
  organization_id   = "64eb4aad-fb7c-4aad-8be7-f0c1d2a0792d"
  name              = "My AWS Creds"
  access_key_id     = "AKIAV6UVWTYP7TMGOIPI"
  secret_access_key = "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"
}

resource "qovery_cluster" "my_cluster" {
  organization_id   = "64eb4aad-fb7c-4aad-8be7-f0c1d2a0792d"
  credentials_id    = qovery_aws_credentials.my_aws_creds.id
  name              = "Demo cluster"
  description       = "Terraform demo cluster"
  cloud_provider    = "AWS"
  region            = "us-east-2"
  instance_type     = "t3a.medium"
  min_running_nodes = 3
  max_running_nodes = 4
}

resource "qovery_project" "my_project" {
  organization_id = "64eb4aad-fb7c-4aad-8be7-f0c1d2a0792d"
  name            = "Strapi V4"

  depends_on = [
    qovery_cluster.my_cluster
  ]
}

resource "qovery_environment" "production" {
  project_id = qovery_project.my_project.id
  name       = "production"
  mode       = "PRODUCTION"
  cluster_id = qovery_cluster.my_cluster.id
}

resource "qovery_database" "my_psql_database" {
  environment_id = qovery_environment.production.id
  name           = "strapi db"
  type           = "POSTGRESQL"
  version        = "13"
  mode           = "MANAGED" # Use AWS RDS for PostgreSQL (backup and PITR automatically configured by Qovery)
  storage        = 10 # 10GB of storage
  accessibility  = "PRIVATE" # do not make it publicly accessible
}

resource "qovery_application" "strapi_app" {
  environment_id = qovery_environment.production.id
  name           = "strapi app"
  cpu            = 1000
  memory         = 512
  git_repository = {
    url       = "https://github.com/Patrik93JS/ToDoApp.git"
    branch    = "main"
    root_path = "/BE/my-project"
  }
  build_mode            = "DOCKER"
  dockerfile_path       = "Dockerfile"
  min_running_instances = 1
  max_running_instances = 1
  ports                 = [
    {
      internal_port       = 1338
      is_default = true
      external_port       = 443
      protocol            = "HTTP"
      publicly_accessible = true
    }
  ]
  healthchecks = {
    readiness_probe = {
      type = {
        http = {
          port = 1338
        }
      }
      initial_delay_seconds = 30
      period_seconds        = 10
      timeout_seconds       = 10
      success_threshold     = 1
      failure_threshold     = 3
    }


    liveness_probe = {
      type = {
        http = {
          port = 1338
        }
      }
      initial_delay_seconds = 30
      period_seconds        = 10
      timeout_seconds       = 10
      success_threshold     = 1
      failure_threshold     = 3
    }
  }
  environment_variables = [
    {
      key   = "PORT"
      value = "1338"
    },
    {
      key   = "HOST"
      value = "0.0.0.0"
    },
    {
      key   = "DATABASE_HOST"
      value = qovery_database.my_psql_database.internal_host
    },
    {
      key   = "DATABASE_PORT"
      value = qovery_database.my_psql_database.port
    },
    {
      key   = "DATABASE_USERNAME"
      value = qovery_database.my_psql_database.login
    },
    {
      key   = "DATABASE_NAME"
      value = "postgres"
    },
  ]
  secrets = [
    {
      key   = "ADMIN_JWT_SECRET"
      value = var.strapi_admin_jwt_secret
    },
    {
      key   = "API_TOKEN_SALT"
      value = var.strapi_api_token_salt
    },
    {
      key   = "APP_KEYS"
      value = var.strapi_app_keys
    },
    {
      key   = "DATABASE_PASSWORD"
      value = qovery_database.my_psql_database.password
    }
  ]
}
