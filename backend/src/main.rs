use std::net::SocketAddr;
use sqlx::postgres::PgPoolOptions;

mod config;
mod error;
mod handlers;
mod models;
mod routes;

#[tokio::main]
async fn main() {
    // Load .env file
    dotenv::dotenv().ok();
    
    // Init standard tracing
    tracing_subscriber::fmt::init();
    
    // We mock the DB pool for now since Postgres isn't running yet locally
    // In production we would unwrap or use real URLs
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:secret@localhost:5432/portfolio".to_string());

    tracing::info!("Initializing DB Pool at {}", database_url);
    
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await;

    let db_pool = match pool {
        Ok(p) => {
            tracing::info!("Connected to PostgreSQL successfully!");
            p
        },
        Err(e) => {
            tracing::warn!("Failed to connect to Postgres. This is expected if Docker isn't running yet. Error: {}", e);
            // Panic or mock. Let's panic in production, but allow mock compile
            // For now, we will just expect it to crash if running without DB, to enforce robust setup
            // panic!("No database connection.")
            return;
        }
    };

    let app_state = config::AppState { db: db_pool };

    let app = routes::create_router(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    tracing::debug!("Listening on {}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
