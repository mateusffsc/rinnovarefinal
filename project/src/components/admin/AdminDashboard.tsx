import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';
import { BarChart3, Users, Eye, Trash2 } from 'lucide-react';
import { getIMCStatus, getRiskLevel } from '../../utils/helpers';
import LeadDetailsModal from './LeadDetailsModal';

const AdminDashboard: React.FC = () => {
  const { 
    leads, 
    exportAllLeads, 
    handleAdminLogout, 
    setIsAdmin,
    clearAllData,
    selectedLead,
    setSelectedLead,
    showLeadDetails,
    setShowLeadDetails,
    getMostRecommendedSupplement
  } = useContext(CheckFitContext);

  const viewLeadDetails = (lead: any) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo - CheckFitJM</h1>
            <div className="flex gap-3">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-gray-600">Sistema Simples: Ativo ✅</span>
              </div>
              <button
                onClick={exportAllLeads}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                📥 Exportar CSV
              </button>
              <button
                onClick={clearAllData}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Limpar Dados
              </button>
              <button
                onClick={() => setIsAdmin(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Voltar ao App
              </button>
              <button
                onClick={handleAdminLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total de Leads</p>
                  <p className="text-2xl font-bold text-blue-600">{leads.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">+ Recomendado</p>
                  <p className="text-lg font-bold text-yellow-600">{getMostRecommendedSupplement()}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Leads Hoje</p>
                  <p className="text-2xl font-bold text-green-600">
                    {leads.filter(lead => 
                      new Date(lead.created_at).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Sistema Simples Ativo</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-green-700 font-medium">Backup Local:</p>
                <p className="text-sm text-green-600">🟢 {leads.length} leads salvos</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Download Automático:</p>
                <p className="text-sm text-green-600">🟢 CSV por lead</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Exportação:</p>
                <p className="text-sm text-green-600">🟢 CSV de todos os leads</p>
              </div>
            </div>
        
            <div className="mt-4 bg-green-100 p-3 rounded text-sm">
              <p className="text-green-800">
                <strong>💡 Como funciona:</strong> Cada lead é salvo automaticamente no navegador. 
                Use o botão "Exportar CSV\" para baixar todos os leads de uma vez.
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Leads Capturados - Sistema Local</h2>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                🟢 {leads.length} Lead{leads.length !== 1 ? 's' : ''} Salvo{leads.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contato</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">IMC</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data/Hora</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Suplemento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nível de Risco</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Diagnóstico</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead) => {
                    const imcData = getIMCStatus(parseFloat(lead.imc));
                    const riskLevel = getRiskLevel(lead.scores);
                    
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{lead.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          <a 
                            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {lead.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${imcData.color}`}>
                            {lead.imc} ({imcData.status})
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{lead.date}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {lead.supplement}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-bold ${riskLevel.color}`}>
                            {riskLevel.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                          {Object.entries(lead.scores)
                            .filter(([_, score]) => score >= 3)
                            .map(([key]) => key)
                            .join(', ')}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Novo Lead
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => viewLeadDetails(lead)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                        Nenhum lead cadastrado ainda
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showLeadDetails && selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => {
            setShowLeadDetails(false);
            setSelectedLead(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;