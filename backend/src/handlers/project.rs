use axum::{
    extract::{Path, State},
    Json,
};
use uuid::Uuid;
use sqlx::{PgPool, query_as};

use crate::{
    config::AppState,
    error::AppError,
    models::project::{CreateProjectDTO, Project, UpdateProjectDTO},
};

pub async fn list(State(state): State<AppState>) -> Result<Json<Vec<Project>>, AppError> {
    // Dynamically query real PostgreSQL
    let projects = query_as::<_, Project>("SELECT * FROM projects ORDER BY created_at DESC")
        .fetch_all(&state.db)
        .await
        .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Db error: {}", e)))?;

    Ok(Json(projects))
}

pub async fn get_by_id(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<Json<Project>, AppError> {
    let project = query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Db error: {}", e)))?
        .ok_or_else(|| AppError::NotFound(format!("Project {} not found", id)))?;
    
    Ok(Json(project))
}

pub async fn create(
    State(state): State<AppState>,
    Json(payload): Json<CreateProjectDTO>,
) -> Result<Json<Project>, AppError> {
    let new_project = query_as::<_, Project>(
        "INSERT INTO projects (title, description, content, tags, is_published) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *"
    )
    .bind(payload.title)
    .bind(payload.description)
    .bind(payload.content)
    .bind(payload.tags.unwrap_or_default())
    .bind(true) // auto publish for simplicity
    .fetch_one(&state.db)
    .await
    .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Insert error: {}", e)))?;
    
    Ok(Json(new_project))
}

pub async fn update(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateProjectDTO>,
) -> Result<Json<Project>, AppError> {
     let project = query_as::<_, Project>(
        "UPDATE projects SET 
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            tags = COALESCE($3, tags),
            is_published = COALESCE($4, is_published),
            content = COALESCE($5, content)
         WHERE id = $6 RETURNING *"
    )
    .bind(payload.title)
    .bind(payload.description)
    .bind(payload.tags)
    .bind(payload.is_published)
    .bind(payload.content)
    .bind(id)
    .fetch_one(&state.db)
    .await
    .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Update error: {}", e)))?;
    
    Ok(Json(project))
}

pub async fn delete(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<Json<serde_json::Value>, AppError> {
    sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await
        .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Delete error: {}", e)))?;
        
    Ok(Json(serde_json::json!({"status": "deleted", "id": id})))
}
