use axum::{extract::State, Json};
use serde::{Deserialize, Serialize};
use async_openai::{
    types::{ChatCompletionRequestSystemMessageArgs, ChatCompletionRequestUserMessageArgs, CreateChatCompletionRequestArgs},
    Client,
};

use crate::{config::AppState, error::AppError};

#[derive(Deserialize)]
pub struct ChatRequest {
    pub message: String,
}

#[derive(Serialize)]
pub struct ChatResponse {
    pub reply: String,
}

// System instructions for the AI representing Rofaz
const SYSTEM_PROMPT: &str = "
You are Nexus, the AI assistant for Md. Rofaz Hasan Rafiu's portfolio.
Rofaz is a Software Engineering student (CSE, RUET) specializing in Backend Engineering, Data Analytics, and AI Systems.
Key skills: Rust, Python, TypeScript, PostgeSQL, GCP, Docker, ML/DL.
Projects: FinTrack (React Native/Firebase), Meal Management (Node/Postgres), Data Analysis (Pandas), API Tools (Weather/Salat).
He was Inter-school Debate Champion and Regional Champion in Govt Creative Talent Hunt.
Be highly technical, enthusiastic, and concise. Convince recruiters he is top-tier.
";

pub async fn chat(
    State(_state): State<AppState>,
    Json(payload): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, AppError> {
    
    // Check if the API key exists. If not, bypass to mock response mode so UI works nicely locally
    if std::env::var("OPENAI_API_KEY").is_err() {
        tracing::info!("OPENAI_API_KEY not found. Using fallback mock response.");
        
        let mock_reply = if payload.message.to_lowercase().contains("rust") {
            "Rofaz excels in Rust, utilizing frameworks like Axum and Tokio to build heavily concurrent, safe architectures with zero-cost abstractions."
        } else if payload.message.to_lowercase().contains("project") || payload.message.to_lowercase().contains("build") {
            "He has built comprehensive full-stack architectures including FinTrack (handling 1000+ daily mock transactions) and deeply optimized PostgreSQL databases handling 50+ concurrent users with 30% reduction in query times."
        } else {
            "I'm Nexus! Rofaz is currently a software engineering student at RUET specializing in Backend, Data Analytics, and AI. He builds heavily parallelized, intelligent systems. Set the OPENAI_API_KEY env variable in the backend to unlock my full LLM inference!"
        };

        return Ok(Json(ChatResponse {
            reply: mock_reply.to_string(),
        }));
    }

    // OpenAI Implementation
    let client = Client::new();

    let request = CreateChatCompletionRequestArgs::default()
        .max_tokens(150_u32)
        .model("gpt-4o")
        .messages([
            ChatCompletionRequestSystemMessageArgs::default()
                .content(SYSTEM_PROMPT)
                .build()
                .unwrap()
                .into(),
            ChatCompletionRequestUserMessageArgs::default()
                .content(payload.message)
                .build()
                .unwrap()
                .into(),
        ])
        .build()
        .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("Failed to build prompt: {}", e)))?;

    let response = client
        .chat()
        .create(request)
        .await
        .map_err(|e| AppError::InternalServerError(anyhow::anyhow!("OpenAI API error: {}", e)))?;

    let reply = response
        .choices
        .first()
        .and_then(|c| c.message.content.clone())
        .unwrap_or_else(|| "Error generating thought process.".to_string());

    Ok(Json(ChatResponse { reply }))
}
