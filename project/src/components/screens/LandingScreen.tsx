import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';
import { Phone, User, ChevronRight, AlertTriangle, Smile } from 'lucide-react';
 
const LandingScreen: React.FC = () => {
  const { 
    userData, 
    setUserData, 
    handleUserDataSubmit, 
    todayCount,
    showAdminLogin
  } = useContext(CheckFitContext);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = e.target.value.replace(/\D/g, '');
    if (formattedPhone.length <= 11) {
      const formatted = formattedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      setUserData({...userData, phone: formatted});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold inline-block">
              🦷 AVALIAÇÃO ODONTOLÓGICA GRATUITA
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rinnovare</h1>
          <p className="text-lg text-blue-600 font-bold mb-4">✨ DIAGNÓSTICO DENTAL INICIAL</p>
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg mb-4">
            <p className="text-gray-800 font-semibold leading-relaxed">
              ⚡ Descubra em <span className="text-blue-600">2 minutos</span> como está a
              <strong> SAÚDE</strong> do seu <strong>SORRISO</strong>!
            </p>
          </div>
          <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg mb-4">
            <p className="text-sm text-cyan-800">
              ⏰ <strong>{todayCount} pessoas</strong> já fizeram sua avaliação hoje
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Seu nome completo
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              WhatsApp (para receber o resultado)
            </label>
            <input
              type="tel"
              value={userData.phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(31) 99999-9999"
            />
          </div>

          <button
            onClick={handleUserDataSubmit}
            disabled={!userData.name || userData.phone.length < 14}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✨ INICIAR AVALIAÇÃO GRATUITA
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            ✓ 100% Gratuito • ✓ Resultado em 2 minutos • ✓ Não substitui o diagnóstico clínico
          </p>
          <p className="text-xs text-blue-600 font-semibold">
            ⭐ Primeira consulta com desconto especial!
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={showAdminLogin}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Área Administrativa
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;