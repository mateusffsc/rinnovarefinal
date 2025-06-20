-- Criação das tabelas para o sistema Rinnovare (Dental Assessment)

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela principal de leads (pacientes)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    -- Dados pessoais
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    weight VARCHAR(10),
    height VARCHAR(10),
    imc VARCHAR(10),
    
    -- Resultado da avaliação
    supplement VARCHAR(100),
    status VARCHAR(50) DEFAULT 'novo' NOT NULL,
    diagnosis TEXT,
    total_score INTEGER DEFAULT 0,
    
    -- Controle
    CONSTRAINT leads_name_check CHECK (char_length(name) >= 2),
    CONSTRAINT leads_phone_check CHECK (char_length(phone) >= 10)
);

-- Tabela de scores por categoria
CREATE TABLE IF NOT EXISTS public.lead_scores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    
    -- Garantir que o score está dentro do range válido
    CONSTRAINT lead_scores_score_check CHECK (score >= 0 AND score <= 10),
    
    -- Garantir uniqueness por lead e categoria
    UNIQUE(lead_id, category)
);

-- Tabela de respostas do questionário
CREATE TABLE IF NOT EXISTS public.lead_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    answer_index INTEGER NOT NULL,
    answer_text TEXT NOT NULL,
    
    -- Garantir uniqueness por lead e pergunta
    UNIQUE(lead_id, question_id)
);

-- Tabela de tratamentos disponíveis (para referência futura)
CREATE TABLE IF NOT EXISTS public.treatments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    targets TEXT[] DEFAULT '{}', -- Array de categorias que o tratamento atende
    benefits TEXT[] DEFAULT '{}' -- Array de benefícios
);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para leads
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_lead_scores_lead_id ON public.lead_scores(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_scores_category ON public.lead_scores(category);
CREATE INDEX IF NOT EXISTS idx_lead_answers_lead_id ON public.lead_answers(lead_id);

-- Inserir tratamentos padrão
INSERT INTO public.treatments (name, description, targets, benefits) VALUES
(
    'Avaliação Odontológica Completa',
    'Protocolo completo de avaliação e diagnóstico profissional',
    ARRAY['dor', 'inflamacao', 'gengiva'],
    ARRAY[
        'Avaliação clínica detalhada',
        'Radiografia panorâmica digital',
        'Plano de tratamento personalizado',
        'Orçamento sem compromisso'
    ]
),
(
    'Protocolo Preventivo Avançado',
    'Programa completo de prevenção e manutenção da saúde bucal',
    ARRAY['prevencao', 'higiene', 'halitose'],
    ARRAY[
        'Limpeza profissional completa',
        'Aplicação de flúor profissional',
        'Orientação de higiene personalizada',
        'Avaliação de risco de cárie'
    ]
),
(
    'Tratamento Restaurador Especializado',
    'Protocolo avançado para restauração da saúde e estética dental',
    ARRAY['sensibilidade', 'estetica', 'desgaste'],
    ARRAY[
        'Restaurações estéticas',
        'Tratamento de sensibilidade',
        'Clareamento dental profissional',
        'Harmonização do sorriso'
    ]
)
ON CONFLICT (name) DO NOTHING;

-- Habilitar RLS (Row Level Security) - Opcional, depende da necessidade
-- ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.lead_answers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança básicas (descomente se necessário)
-- CREATE POLICY "Enable read access for all users" ON public.leads FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON public.leads FOR INSERT WITH CHECK (true);

-- Comentários para documentação
COMMENT ON TABLE public.leads IS 'Tabela principal com dados dos pacientes e resultados da avaliação dental';
COMMENT ON TABLE public.lead_scores IS 'Scores por categoria de cada avaliação';
COMMENT ON TABLE public.lead_answers IS 'Respostas específicas do questionário';
COMMENT ON TABLE public.treatments IS 'Catálogo de tratamentos disponíveis';

COMMENT ON COLUMN public.leads.diagnosis IS 'Diagnóstico textual gerado com base nos scores';
COMMENT ON COLUMN public.leads.total_score IS 'Soma total de todos os scores';
COMMENT ON COLUMN public.leads.supplement IS 'Tratamento/suplemento recomendado';
COMMENT ON COLUMN public.lead_scores.category IS 'Categoria avaliada (ex: dor, gengiva, sensibilidade)';
COMMENT ON COLUMN public.lead_answers.question_id IS 'ID da pergunta do questionário';
COMMENT ON COLUMN public.lead_answers.answer_index IS 'Índice da resposta escolhida';

-- View para facilitar consultas com dados completos
CREATE OR REPLACE VIEW public.leads_complete AS
SELECT 
    l.*,
    COALESCE(
        json_object_agg(
            ls.category, ls.score
        ) FILTER (WHERE ls.category IS NOT NULL),
        '{}'::json
    ) as scores,
    COALESCE(
        json_object_agg(
            la.question_id::text, 
            json_build_object(
                'answer_index', la.answer_index,
                'answer_text', la.answer_text
            )
        ) FILTER (WHERE la.question_id IS NOT NULL),
        '{}'::json
    ) as answers
FROM public.leads l
LEFT JOIN public.lead_scores ls ON l.id = ls.lead_id
LEFT JOIN public.lead_answers la ON l.id = la.lead_id
GROUP BY l.id, l.created_at, l.updated_at, l.name, l.phone, l.weight, l.height, l.imc, l.supplement, l.status, l.diagnosis, l.total_score
ORDER BY l.created_at DESC; 