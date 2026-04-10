use axum::{
    routing::{get, post, put, delete},
    Router,
};

use crate::config::AppState;
use crate::handlers::{project, ai};

pub fn create_router(state: AppState) -> Router {
    
    let api_routes = Router::new()
        .route("/projects", get(project::list).post(project::create))
        .route("/projects/:id", get(project::get_by_id).put(project::update).delete(project::delete))
        .route("/ai/chat", post(ai::chat));

    Router::new()
        .route("/health", get(|| async { "API is running 🚀" }))
        .nest("/api", api_routes)
        .with_state(state)
}
