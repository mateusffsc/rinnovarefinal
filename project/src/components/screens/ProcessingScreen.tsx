import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';
import { Loader } from 'lucide-react';

const ProcessingScreen: React.FC = () => {
  const { isLoading, saveStatus } = useContext(CheckFitContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-blue-100">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🔬 ANALISANDO SEUS SINTOMAS...
          </h2>
          <p className="text-blue-600 font-semibold mb-4">
            Processando sua avaliação odontológica
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Verificando sintomas...</p>
            <p>✓ Analisando riscos...</p>
            <p>✓ Avaliando necessidades...</p>
            <p>✓ Definindo recomendações...</p>
            {isLoading && <p className="text-green-600 font-semibold">📊 {saveStatus}</p>}
          </div>
        </div>

        <div className="w-full bg-blue-100 rounded-full h-3">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full animate-pulse"></div>
        </div>
        
        <p className="text-xs text-blue-600 mt-4 font-bold">
          ⚠️ Preparando seu diagnóstico preliminar...
        </p>
      </div>
    </div>
  );
};

export default ProcessingScreen;