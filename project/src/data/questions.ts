export interface Option {
  text: string;
  scores: Score;
}

interface Score {
  [key: string]: number;
}

export interface Question {
  id: number;
  text: string;
  subtitle: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Com que frequência você sente dores ou desconforto nos dentes/gengivas?",
    subtitle: "Esta informação é crucial para avaliar possíveis condições agudas",
    options: [
      { text: "Nunca sinto dores ou desconforto", scores: { dor: 0, inflamacao: 0 } },
      { text: "Ocasionalmente sinto desconforto", scores: { dor: 2, inflamacao: 2 } },
      { text: "Frequentemente sinto dores", scores: { dor: 5, inflamacao: 4 } }
    ]
  },
  {
    id: 2,
    text: "Você percebe sangramento ao escovar os dentes?",
    subtitle: "O sangramento é um indicador importante de saúde gengival",
    options: [
      { text: "Nunca percebo sangramento", scores: { gengiva: 0, inflamacao: 0 } },
      { text: "Às vezes percebo sangramento", scores: { gengiva: 3, inflamacao: 2 } },
      { text: "Sangramento frequente", scores: { gengiva: 5, inflamacao: 4 } }
    ]
  },
  {
    id: 3,
    text: "Há quanto tempo você não realiza uma avaliação odontológica?",
    subtitle: "O acompanhamento regular é essencial para prevenção",
    options: [
      { text: "Menos de 6 meses", scores: { prevencao: 0 } },
      { text: "Entre 6 meses e 1 ano", scores: { prevencao: 2, risco: 2 } },
      { text: "Mais de 1 ano", scores: { prevencao: 5, risco: 4 } }
    ]
  },
  {
    id: 4,
    text: "Você possui sensibilidade a temperaturas (quente/frio)?",
    subtitle: "A sensibilidade pode indicar problemas no esmalte dental",
    options: [
      { text: "Não tenho sensibilidade", scores: { sensibilidade: 0 } },
      { text: "Sensibilidade moderada", scores: { sensibilidade: 3, desgaste: 2 } },
      { text: "Sensibilidade intensa", scores: { sensibilidade: 5, desgaste: 4 } }
    ]
  },
  {
    id: 5,
    text: "Com que frequência você percebe mau hálito?",
    subtitle: "O hálito pode indicar condições bucais importantes",
    options: [
      { text: "Raramente ou nunca", scores: { halitose: 0 } },
      { text: "Ocasionalmente", scores: { halitose: 2, higiene: 2 } },
      { text: "Frequentemente", scores: { halitose: 5, higiene: 4 } }
    ]
  },
  {
    id: 6,
    text: "Qual seu nível de satisfação com a estética do seu sorriso?",
    subtitle: "A autoavaliação estética é importante para o tratamento",
    options: [
      { text: "Completamente satisfeito", scores: { estetica: 0 } },
      { text: "Parcialmente satisfeito", scores: { estetica: 2 } },
      { text: "Insatisfeito", scores: { estetica: 5 } }
    ]
  },
  {
    id: 7,
    text: "Em uma escala, qual sua preocupação atual com a saúde bucal?",
    subtitle: "Sua percepção sobre sua saúde bucal é fundamental",
    options: [
      { text: "Baixa preocupação", scores: { consciencia: 5, risco: 3 } },
      { text: "Preocupação moderada", scores: { consciencia: 2, risco: 2 } },
      { text: "Alta preocupação", scores: { consciencia: 0, risco: 1 } }
    ]
  }
];