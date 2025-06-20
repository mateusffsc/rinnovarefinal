export interface Treatment {
  name: string;
  description: string;
  targets: string[];
  benefits: string[];
}

export interface Treatments {
  [key: string]: Treatment;
}

export const supplements: Treatments = {
  AvaliacaoCompleta: {
    name: "Avaliação Odontológica Completa",
    description: "Protocolo completo de avaliação e diagnóstico profissional",
    targets: ["dor", "inflamacao", "gengiva"],
    benefits: [
      "Avaliação clínica detalhada",
      "Radiografia panorâmica digital",
      "Plano de tratamento personalizado",
      "Orçamento sem compromisso"
    ]
  },
  TratamentoPreventivo: {
    name: "Protocolo Preventivo Avançado",
    description: "Programa completo de prevenção e manutenção da saúde bucal",
    targets: ["prevencao", "higiene", "halitose"],
    benefits: [
      "Limpeza profissional completa",
      "Aplicação de flúor profissional",
      "Orientação de higiene personalizada",
      "Avaliação de risco de cárie"
    ]
  },
  TratamentoRestaurador: {
    name: "Tratamento Restaurador Especializado",
    description: "Protocolo avançado para restauração da saúde e estética dental",
    targets: ["sensibilidade", "estetica", "desgaste"],
    benefits: [
      "Restaurações estéticas",
      "Tratamento de sensibilidade",
      "Clareamento dental profissional",
      "Harmonização do sorriso"
    ]
  }
};