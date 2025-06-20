import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';
import { AlertTriangle, Clock, Stethoscope, SmilePlus } from 'lucide-react';

const ResultScreen: React.FC = () => {
  const { 
    userData, 
    scores,
    answers,
    answerTexts,
    generateWhatsAppMessage,
    resetQuiz
  } = useContext(CheckFitContext);

  if (!userData || !scores || !answers) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando resultados...</div>
      </div>
    );
  }

  const getPreoccupationLevel = () => {
    const conscienciaScore = scores.consciencia || 0;
    if (conscienciaScore >= 4) return "baixa";
    if (conscienciaScore >= 2) return "média";
    return "alta";
  };

  const getLastVisitText = () => {
    const prevencaoScore = scores.prevencao || 0;
    if (prevencaoScore >= 4) return "mais de 12";
    if (prevencaoScore >= 2) return "6-12";
    return "menos de 6";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              RELATÓRIO AVANÇADO – CLÍNICA ODONTOLÓGICA
            </h1>
            <div className="h-1 w-32 bg-blue-600 mx-auto"></div>
          </div>

          {/* Personal Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              📝 Análise Pessoal do Seu Sorriso – Avaliação Inicial
            </h2>
            <p className="text-lg mb-4">
              Olá, <span className="font-semibold">{userData.name}</span>!
            </p>
            <p className="text-gray-700 mb-6">
              Com base nas suas respostas, detectamos vários sinais importantes que indicam riscos sérios 
              à sua saúde bucal e à estética do seu sorriso.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Você relatou que:</h3>
              <ul className="space-y-3">
                {scores.gengiva > 2 && (
                  <li className="flex items-center text-red-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Sente desconforto ao escovar e percebeu sangramentos 🩸
                  </li>
                )}
                <li className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-2" />
                  Não vai ao dentista há mais de {getLastVisitText()} meses
                </li>
                {scores.sensibilidade > 2 && (
                  <li className="flex items-center text-orange-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Já percebeu sensibilidade a alimentos gelados/quentes
                  </li>
                )}
                {scores.estetica > 2 && (
                  <li className="flex items-center text-red-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Está insatisfeito(a) com seu sorriso e sente insegurança ao sorrir
                  </li>
                )}
                <li className="flex items-center text-blue-700">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Classifica sua preocupação com a saúde bucal como {getPreoccupationLevel()}
                </li>
              </ul>
            </div>
          </div>

          {/* Preliminary Diagnosis */}
          <div className="mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>⚠️ Diagnóstico Preliminar</strong>
                <br />
                <span className="text-sm">
                  Atenção: este relatório não substitui uma consulta profissional, mas serve como uma 
                  triagem técnica e emocional da sua saúde bucal atual.
                </span>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Com base nos seus relatos, você apresenta possíveis indícios de:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {scores.gengiva > 2 && (
                    <li>• Gengivite (fase inicial de inflamação gengival)</li>
                  )}
                  {scores.higiene > 2 && (
                    <li>• Placa bacteriana em acúmulo</li>
                  )}
                  {scores.prevencao > 2 && (
                    <li>• Cáries não tratadas</li>
                  )}
                  {scores.gengiva > 3 && (
                    <li>• Início de retração gengival</li>
                  )}
                  {scores.estetica > 2 && (
                    <li>• Comprometimento estético (amarelamento, desalinhamento ou manchas)</li>
                  )}
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">
                  Essas condições tendem a piorar silenciosamente e, se não forem tratadas agora, 
                  podem evoluir para:
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Periodontite (perda óssea e dos dentes)</li>
                  <li>• Tratamentos invasivos como canal ou implante</li>
                  <li>• Danos irreversíveis à autoestima e ao bem-estar</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Personal Reflection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              💬 Reflexão Pessoal – Isso está te afetando mais do que parece?
            </h2>
            <p className="text-gray-700 mb-4">
              Muitos dos nossos pacientes só percebem o impacto real quando se olham no espelho e 
              percebem que estão sorrindo menos.
              <br />
              Outros relatam dor para comer, vergonha em fotos, e até queda de desempenho social e profissional.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">
                Você já parou para pensar:
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Quantas vezes você escondeu o sorriso?</li>
                <li>• Quanto isso pode estar afetando sua autoconfiança?</li>
                <li>• E quanto pode custar, financeiramente e emocionalmente, se você continuar adiando?</li>
              </ul>
            </div>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                ✅ Boa notícia: há solução — e começa com uma avaliação simples
              </h2>
              <p className="text-green-700 mb-4">
                Você está a um passo de mudar isso.
                <br />
                Nossa clínica está oferecendo uma avaliação personalizada gratuita, onde será feito um 
                exame completo, um plano de tratamento adequado ao seu caso e, o mais importante, 
                sem julgamentos — apenas cuidado.
              </p>
              <p className="font-semibold text-green-800">
                Você não precisa conviver com esse desconforto.
                <br />
                Seu sorriso é seu cartão de visitas. E ele pode ser restaurado.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-800">
              🔔 Recomendação Imediata
            </h2>
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-center text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              🦷 QUERO AVALIAR MEU SORRISO AGORA
            </a>
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-center text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📲 FALAR COM ESPECIALISTA
            </a>
            <p className="text-center text-sm text-red-600 font-semibold">
              ⏰ Vagas limitadas para esse mês
            </p>
            <button
              onClick={resetQuiz}
              className="block w-full bg-gray-600 text-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Refazer Avaliação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;