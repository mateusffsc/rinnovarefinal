import { supabase } from '../lib/supabase';

export async function setupDatabase() {
  console.log('🔄 Configurando banco de dados...');
  
  try {
    // Criar tabela de leads
    const { error: leadsError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (leadsError) console.log('Tabela leads já existe ou foi criada');

    // Criar tabela de scores
    const { error: scoresError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS lead_scores (
          id SERIAL PRIMARY KEY,
          lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
          category TEXT NOT NULL,
          score INTEGER NOT NULL DEFAULT 0
        );
      `
    });

    if (scoresError) console.log('Tabela lead_scores já existe ou foi criada');

    // Criar tabela de respostas
    const { error: answersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS lead_answers (
          id SERIAL PRIMARY KEY,
          lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
          question_id INTEGER NOT NULL,
          answer_index INTEGER NOT NULL,
          answer_text TEXT NOT NULL
        );
      `
    });

    if (answersError) console.log('Tabela lead_answers já existe ou foi criada');

    console.log('✅ Banco de dados configurado!');
    return { success: true };

  } catch (error) {
    console.error('❌ Erro ao configurar banco:', error);
    return { success: false, error: String(error) };
  }
} 