import React from 'react';
import { X, Phone, User, Scale, Ruler, AlertTriangle, MessageCircle } from 'lucide-react';
import { questions } from '../../data/questions';
import { getIMCStatus, getRiskLevel } from '../../utils/helpers';

interface LeadDetailsModalProps {
  lead: any;
  onClose: () => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  const generateDentalDiagnosis = (scores: any): string => {
    const issues = [];
    
    if (scores.dor >= 4) issues.push("dores dentárias severas");
    else if (scores.dor >= 2) issues.push("desconforto dental ocasional");
    
    if (scores.gengiva >= 4) issues.push("problemas gengivais graves");
    else if (scores.gengiva >= 2) issues.push("gengivite leve");
    
    if (scores.inflamacao >= 4) issues.push("inflamação acentuada");
    else if (scores.inflamacao >= 2) issues.push("inflamação moderada");
    
    if (scores.sensibilidade >= 4) issues.push("sensibilidade dental severa");
    else if (scores.sensibilidade >= 2) issues.push("sensibilidade dental moderada");
    
    if (scores.halitose >= 4) issues.push("halitose persistente");
    else if (scores.halitose >= 2) issues.push("halitose ocasional");
    
    if (scores.prevencao >= 4) issues.push("falta de acompanhamento odontológico");
    else if (scores.prevencao >= 2) issues.push("necessidade de avaliação preventiva");
    
    if (scores.estetica >= 4) issues.push("alta insatisfação estética");
    else if (scores.estetica >= 2) issues.push("preocupações estéticas");
    
    return issues.length > 0 ? issues.join(", ") : "saúde bucal satisfatória";
  };

  const imcData = getIMCStatus(parseFloat(lead.imc));
  const riskLevel = getRiskLevel(lead.scores);
  const diagnosis = generateDentalDiagnosis(lead.scores);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📊 Relatório Detalhado</h2>
              <p className="text-red-100 text-sm mt-1">Análise completa do diagnóstico</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-red-800/50 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-red-600" />
              Informações Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Nome Completo</p>
                <p className="font-semibold text-gray-900">{lead.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">WhatsApp</p>
                <a 
                  href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  {lead.phone}
                </a>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Medidas</p>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <Scale className="h-4 w-4 text-gray-500" />
                    {lead.weight}kg
                  </span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    {lead.height}cm
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">IMC</p>
                <p className={`font-semibold ${imcData.color}`}>
                  {lead.imc} ({imcData.status})
                </p>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-red-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Análise de Risco
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${riskLevel.color} ${riskLevel.bg}`}>
                Nível {riskLevel.level}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(lead.scores).map(([category, score]) => {
                const scoreNum = Number(score);
                return (
                  <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">{category}</span>
                      <span className={`font-bold ${
                        scoreNum >= 4 ? 'text-red-600' :
                        scoreNum >= 2 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{scoreNum}/5</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          scoreNum >= 4 ? 'bg-red-600' :
                          scoreNum >= 2 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(scoreNum / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quiz Answers */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Respostas do Questionário
            </h3>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-medium text-gray-800 mb-2">
                    {index + 1}. {question.text}
                  </p>
                  <p className="text-blue-700 bg-blue-50 p-2 rounded-lg text-sm">
                    ✓ {question.options[lead.answers?.[question.id]]?.text || "Não respondida"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Diagnóstico Final</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Suplemento Recomendado</p>
                <p className="text-lg font-bold text-green-700">{lead.supplement}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Análise Completa</p>
                <p className="text-gray-800">{diagnosis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t flex justify-end gap-3 sticky bottom-0">
          <a
            href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Contatar via WhatsApp
          </a>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;