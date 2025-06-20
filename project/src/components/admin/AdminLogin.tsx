import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';

const AdminLogin: React.FC = () => {
  const {
    loginCredentials,
    setLoginCredentials,
    loginError,
    handleAdminLogin,
    setShowLogin,
  } = useContext(CheckFitContext);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🔒</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Área Administrativa</h1>
          <p className="text-gray-400">Acesso restrito autorizado</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Usuário
            </label>
            <input
              type="text"
              value={loginCredentials.username}
              onChange={(e) => setLoginCredentials({...loginCredentials, username: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400"
              placeholder="Nome de usuário"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={loginCredentials.password}
              onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400"
              placeholder="Senha de acesso"
              autoComplete="current-password"
            />
          </div>

          {loginError && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <button
            onClick={handleAdminLogin}
            disabled={!loginCredentials.username || !loginCredentials.password}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Acessar Sistema
          </button>

          <button
            onClick={() => setShowLogin(false)}
            className="w-full bg-gray-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            Cancelar
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔐 Sistema protegido - CheckFitJM Admin v2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;