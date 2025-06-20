import { supabase } from '../lib/supabase';

// Interface simples para os dados do lead
export interface LeadData {
  id: string;
  name: string;
  phone: string;
  weight: string;
  height: string;
  imc: string;
  supplement: string;
  scores: Record<string, number>;
  answers: Record<string, number>;
  answerTexts: Record<string, string>;
}

// Função para salvar um lead completo no Supabase
export async function saveLeadToSupabase(leadData: LeadData) {
  try {
    console.log('🔄 Salvando no Supabase:', leadData.name);
    
    // 1. Salvar lead principal
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        id: leadData.id,
        name: leadData.name,
        phone: leadData.phone,
        weight: leadData.weight,
        height: leadData.height,
        imc: leadData.imc,
        supplement: leadData.supplement,
        status: 'novo',
        total_score: Object.values(leadData.scores).reduce((sum, score) => sum + score, 0)
      })
      .select()
      .single();

    if (leadError) throw leadError;

    // 2. Salvar scores
    const scoreInserts = Object.entries(leadData.scores).map(([category, score]) => ({
      lead_id: leadData.id,
      category,
      score
    }));

    if (scoreInserts.length > 0) {
      const { error: scoresError } = await supabase
        .from('lead_scores')
        .insert(scoreInserts);
      
      if (scoresError) throw scoresError;
    }

    // 3. Salvar respostas
    const answerInserts = Object.entries(leadData.answers).map(([questionId, answerIndex]) => ({
      lead_id: leadData.id,
      question_id: parseInt(questionId),
      answer_index: answerIndex,
      answer_text: leadData.answerTexts[questionId] || ''
    }));

    if (answerInserts.length > 0) {
      const { error: answersError } = await supabase
        .from('lead_answers')
        .insert(answerInserts);
      
      if (answersError) throw answersError;
    }

    console.log('✅ Salvo no Supabase com sucesso!');
    return { success: true, data: lead };

  } catch (error) {
    console.error('❌ Erro no Supabase:', error);
    return { success: false, error: String(error) };
  }
}

// Função para buscar todos os leads
export async function getAllLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        *,
        lead_scores (category, score),
        lead_answers (question_id, answer_index, answer_text)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Converter dados para o formato da aplicação
    const convertedLeads = data?.map((lead: any) => ({
      ...lead,
      date: new Date(lead.created_at).toLocaleString('pt-BR'),
      scores: lead.lead_scores.reduce((acc: any, score: any) => {
        acc[score.category] = score.score;
        return acc;
      }, {}),
      answers: lead.lead_answers.reduce((acc: any, answer: any) => {
        acc[answer.question_id] = answer.answer_index;
        return acc;
      }, {}),
      answerTexts: lead.lead_answers.reduce((acc: any, answer: any) => {
        acc[answer.question_id] = answer.answer_text;
        return acc;
      }, {})
    })) || [];

    return { success: true, data: convertedLeads };

  } catch (error) {
    console.error('❌ Erro ao buscar leads:', error);
    return { success: false, error: String(error), data: [] };
  }
}

// Função para testar conexão
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1);

    if (error) throw error;
    
    console.log('✅ Conexão com Supabase OK');
    return { success: true };

  } catch (error) {
    console.error('❌ Erro de conexão:', error);
    return { success: false, error: String(error) };
  }
} 