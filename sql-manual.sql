-- Caso o setup automático não funcione, execute este SQL no Supabase Dashboard

-- 1. Tabela principal de leads
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    weight TEXT,
    height TEXT,
    imc TEXT,
    supplement TEXT,
    status TEXT DEFAULT 'novo',
    diagnosis TEXT,
    total_score INTEGER DEFAULT 0
);

-- 2. Tabela de scores por categoria
CREATE TABLE IF NOT EXISTS lead_scores (
    id SERIAL PRIMARY KEY,
    lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0
);

-- 3. Tabela de respostas do questionário
CREATE TABLE IF NOT EXISTS lead_answers (
    id SERIAL PRIMARY KEY,
    lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    answer_index INTEGER NOT NULL,
    answer_text TEXT NOT NULL
);

-- 4. Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_lead_scores_lead_id ON lead_scores(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_answers_lead_id ON lead_answers(lead_id);

-- Pronto! Execute este código no SQL Editor do Supabase Dashboard 