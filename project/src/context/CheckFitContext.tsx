import React, { createContext, useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { supplements } from '../data/supplements';
import { formatPhone, calculateIMC } from '../utils/helpers';
import { saveLeadToSupabase, getAllLeads, testConnection } from '../services/supabaseService';
import type { LeadData } from '../services/supabaseService';
import { setupDatabase } from '../utils/setupDatabase';

interface UserData {
  name: string;
  phone: string;
  weight: string;
  height: string;
}

interface Scores {
  [key: string]: number;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  weight: string;
  height: string;
  imc: string;
  date: string;
  supplement: string;
  scores: Scores;
  created_at: string;
  status: string;
  answers: Record<string, number>;
  answerTexts: Record<string, string>;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface CheckFitContextType {
  currentScreen: string;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  answerTexts: Record<string, string>;
  setAnswerTexts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  scores: Scores;
  setScores: React.Dispatch<React.SetStateAction<Scores>>;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  loginCredentials: LoginCredentials;
  setLoginCredentials: React.Dispatch<React.SetStateAction<LoginCredentials>>;
  loginError: string;
  setLoginError: React.Dispatch<React.SetStateAction<string>>;
  todayCount: number;
  setTodayCount: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  saveStatus: string;
  setSaveStatus: React.Dispatch<React.SetStateAction<string>>;
  handleUserDataSubmit: () => void;
  handleAnswer: (answerIndex: number) => Promise<void>;
  getRecommendedSupplement: () => string;
  resetQuiz: () => void;
  handleAdminLogin: () => void;
  handleAdminLogout: () => void;
  showAdminLogin: () => void;
  generateWhatsAppMessage: () => string;
  getTotalProblems: () => number;
  exportAllLeads: () => void;
  clearAllData: () => void;
  selectedLead: Lead | null;
  setSelectedLead: React.Dispatch<React.SetStateAction<Lead | null>>;
  showLeadDetails: boolean;
  setShowLeadDetails: React.Dispatch<React.SetStateAction<boolean>>;
  getMostRecommendedSupplement: () => string;
}

const defaultContextValue: CheckFitContextType = {
  currentScreen: 'landing',
  setCurrentScreen: () => {},
  userData: { name: '', phone: '', weight: '', height: '' },
  setUserData: () => {},
  currentQuestion: 0,
  setCurrentQuestion: () => {},
  answers: {},
  setAnswers: () => {},
  answerTexts: {},
  setAnswerTexts: () => {},
  scores: {},
  setScores: () => {},
  leads: [],
  setLeads: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  showLogin: false,
  setShowLogin: () => {},
  loginCredentials: { username: '', password: '' },
  setLoginCredentials: () => {},
  loginError: '',
  setLoginError: () => {},
  todayCount: 17,
  setTodayCount: () => {},
  isLoading: false,
  setIsLoading: () => {},
  saveStatus: '',
  setSaveStatus: () => {},
  handleUserDataSubmit: () => {},
  handleAnswer: async () => {},
  getRecommendedSupplement: () => "ProPremium",
  resetQuiz: () => {},
  handleAdminLogin: () => {},
  handleAdminLogout: () => {},
  showAdminLogin: () => {},
  generateWhatsAppMessage: () => "",
  getTotalProblems: () => 0,
  exportAllLeads: () => {},
  clearAllData: () => {},
  selectedLead: null,
  setSelectedLead: () => {},
  showLeadDetails: false,
  setShowLeadDetails: () => {},
  getMostRecommendedSupplement: () => "Nenhum"
};

export const CheckFitContext = createContext<CheckFitContextType>(defaultContextValue);

const ADMIN_CREDENTIALS = {
  username: 'YWRtaW5qb3ViZXJ0bWlsbGVy',
  password: 'Sm91YmVydDEwMTA3KkpN'
};

const STORAGE_KEY = 'checkfit-leads';

const getRecommendedSupplementFromScores = (scoresData: Scores): string => {
  // Lógica simplificada baseada nos scores mais altos
  const sortedScores = Object.entries(scoresData).sort((a, b) => b[1] - a[1]);
  
  if (scoresData.sensibilidade >= 4 || scoresData.dor >= 4) {
    return "TurboX";
  }
  
  if (scoresData.gengiva >= 4 || scoresData.inflamacao >= 4) {
    return "BlackTurbo";
  }
  
  return "ProPremium";
};

export const CheckFitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', weight: '', height: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Scores>({});
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const savedLeads = localStorage.getItem(STORAGE_KEY);
      return savedLeads ? JSON.parse(savedLeads) : [];
    } catch (error) {
      console.error('Error loading leads from localStorage:', error);
      return [];
    }
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [todayCount, setTodayCount] = useState(17);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [leads]);

  // Carregar dados do Supabase quando a aplicação inicializar
  useEffect(() => {
    const loadLeadsFromSupabase = async () => {
      try {
        console.log('🔄 Carregando leads do Supabase...');
        const result = await getAllLeads();
        
                if (result.success && result.data.length > 0) {
          setLeads(result.data);
          console.log('✅ Leads carregados do Supabase:', result.data.length);
          
          // Calcular leads de hoje
          const today = new Date().toDateString();
          const todayLeads = result.data.filter((lead: any) => 
            new Date(lead.created_at).toDateString() === today
          );
          setTodayCount(todayLeads.length);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do Supabase:', error);
      }
    };

    // Setup do banco e carregar dados
    const initializeSupabase = async () => {
      const setupResult = await setupDatabase();
      if (setupResult.success) {
        console.log('✅ Banco configurado, carregando dados...');
        loadLeadsFromSupabase();
      } else {
        console.warn('⚠️ Falha no setup do Supabase, usando dados locais');
      }
    };
    
    initializeSupabase();
  }, []);

  const handleUserDataSubmit = () => {
    if (userData.name && userData.phone.length >= 14) {
      setCurrentScreen('quiz');
    }
  };

  const handleAnswer = async (answerIndex: number) => {
    const question = questions[currentQuestion];
    const selectedAnswer = question.options[answerIndex];
    
    const newAnswers = { ...answers, [question.id]: answerIndex };
    setAnswers(newAnswers);

    const newAnswerTexts = { ...answerTexts, [question.id]: selectedAnswer.text };
    setAnswerTexts(newAnswerTexts);

    const newScores = { ...scores };
    Object.keys(selectedAnswer.scores).forEach(category => {
      newScores[category] = (newScores[category] || 0) + selectedAnswer.scores[category];
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentScreen('processing');
      setTimeout(async () => {
        const finalRecommendedSupplement = getRecommendedSupplementFromScores(newScores);
        
        const newLead: Lead = {
          id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: userData.name,
          phone: userData.phone,
          weight: userData.weight,
          height: userData.height,
          imc: calculateIMC(userData),
          date: new Date().toLocaleString('pt-BR'),
          supplement: finalRecommendedSupplement,
          scores: newScores,
          created_at: new Date().toISOString(),
          status: 'novo',
          answers: newAnswers,
          answerTexts: newAnswerTexts
        };
        
        await saveLead(newLead);
        setCurrentScreen('result');
      }, 4000);
    }
  };



  const saveToSupabase = async (leadData: Lead) => {
    console.log('🔄 Salvando dados no Supabase...');
    
    // Converter Lead para LeadData (formato esperado pelo service)
    const supabaseLeadData: LeadData = {
      id: leadData.id,
      name: leadData.name,
      phone: leadData.phone,
      weight: leadData.weight,
      height: leadData.height,
      imc: leadData.imc,
      supplement: leadData.supplement,
      scores: leadData.scores,
      answers: leadData.answers,
      answerTexts: leadData.answerTexts
    };

    try {
      const result = await saveLeadToSupabase(supabaseLeadData);
      
      if (result.success) {
        console.log('✅ Dados salvos no Supabase com sucesso!');
        return { success: true, data: result.data };
      } else {
        console.error('❌ Erro ao salvar no Supabase:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ Erro inesperado no Supabase:', error);
      return { success: false, error: String(error) };
    }
  };

  const saveLead = async (leadData: Lead) => {
    console.log('Saving lead:', leadData);
    setIsLoading(true);
    setSaveStatus('💾 Salvando dados...');
    
    try {
      // Salvar localmente
      setLeads(prevLeads => {
        const newLeads = [...prevLeads, leadData];
        console.log('Updated leads array:', newLeads.length, 'leads');
        return newLeads;
      });
      
      // Enviar para Supabase
      setSaveStatus('📊 Enviando para banco de dados...');
      const supabaseResult = await saveToSupabase(leadData);
      
      if (supabaseResult.success) {
        setSaveStatus('✅ Dados salvos no banco!');
      } else {
        console.warn('⚠️ Falha no Supabase, dados salvos localmente:', supabaseResult.error);
        setSaveStatus('✅ Dados salvos localmente!');
      }
      
      return { success: true, leadId: leadData.id };
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setSaveStatus('❌ Erro ao salvar dados');
      return { success: false, error: String(error) };
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  const getMostRecommendedSupplement = () => {
    if (leads.length === 0) return "Nenhum";
    const supplements = leads.map(lead => lead.supplement);
    const counts = supplements.reduce((acc, sup) => {
      acc[sup] = (acc[sup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Nenhum";
  };

  const getRecommendedSupplement = () => {
    const currentLead = leads[leads.length - 1];
    return currentLead?.supplement || "ProPremium";
  };

  const clearAllData = () => {
    if (window.confirm('🚨 ATENÇÃO: Isso irá apagar TODOS os leads salvos. Tem certeza?')) {
      try {
        setLeads([]);
        localStorage.removeItem(STORAGE_KEY);
        console.log('All data cleared successfully');
        alert('✅ Todos os dados foram limpos com sucesso!');
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('❌ Erro ao limpar dados');
      }
    }
  };

  const exportAllLeads = () => {
    if (leads.length === 0) {
      alert('Nenhum lead para exportar!');
      return;
    }

    try {
      const csvData = [
        ['Data/Hora', 'Nome', 'Telefone', 'Peso', 'Altura', 'IMC', 'Suplemento', 'Relatório']
      ];

      leads.forEach(lead => {
        csvData.push([
          lead.date,
          lead.name,
          lead.phone,
          lead.weight,
          lead.height, 
          lead.imc,
          lead.supplement,
          'Diagnóstico disponível no sistema'
        ]);
      });

      const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `todos_leads_checkfitdental_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('CSV exported successfully:', leads.length, 'leads');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Erro ao exportar CSV');
    }
  };

  const getTotalProblems = () => {
    return Object.values(scores).reduce((acc, score) => acc + (score >= 2 ? 1 : 0), 0);
  };

  const generateWhatsAppMessage = () => {
    const supplement = getRecommendedSupplement();
    const imc = calculateIMC(userData);
    const totalProblems = getTotalProblems();
    const problemLevel = totalProblems >= 4 ? 'graves problemas dentais' : totalProblems >= 2 ? 'algumas preocupações dentais' : 'boa saúde bucal geral';
    const message = `🚨 URGENTE! Acabei de fazer meu diagnóstico dental na Rinnovare e descobri que tenho ${problemLevel}. Meu IMC atual é ${imc} e o sistema recomendou tratamentos específicos. Preciso de ajuda HOJE para reverter essa situação antes que piore ainda mais!`;
    return `https://wa.me/5531994358362?text=${encodeURIComponent(message)}`;
  };

  const resetQuiz = () => {
    setCurrentScreen('landing');
    setUserData({ name: '', phone: '', weight: '', height: '' });
    setCurrentQuestion(0);
    setAnswers({});
    setAnswerTexts({});
    setScores({});
  };

  const handleAdminLogin = () => {
    const inputUsername = btoa(loginCredentials.username);
    const inputPassword = btoa(loginCredentials.password);
    
    if (inputUsername === ADMIN_CREDENTIALS.username && inputPassword === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginError('');
      setLoginCredentials({ username: '', password: '' });
      console.log('Admin login successful');
    } else {
      setLoginError('Credenciais inválidas. Acesso negado.');
      setLoginCredentials({ ...loginCredentials, password: '' });
      console.log('Admin login failed');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setLoginCredentials({ username: '', password: '' });
    console.log('Admin logout successful');
  };

  const showAdminLogin = () => {
    setShowLogin(true);
  };

  return (
    <CheckFitContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        userData,
        setUserData,
        currentQuestion,
        setCurrentQuestion,
        answers,
        setAnswers,
        answerTexts,
        setAnswerTexts,
        scores,
        setScores,
        leads,
        setLeads,
        isAdmin,
        setIsAdmin,
        showLogin,
        setShowLogin,
        loginCredentials,
        setLoginCredentials,
        loginError,
        setLoginError,
        todayCount,
        setTodayCount,
        isLoading,
        setIsLoading,
        saveStatus,
        setSaveStatus,
        handleUserDataSubmit,
        handleAnswer,
        getRecommendedSupplement,
        resetQuiz,
        handleAdminLogin,
        handleAdminLogout,
        showAdminLogin,
        generateWhatsAppMessage,
        getTotalProblems,
        exportAllLeads,
        clearAllData,
        selectedLead,
        setSelectedLead,
        showLeadDetails,
        setShowLeadDetails,
        getMostRecommendedSupplement
      }}
    >
      {children}
    </CheckFitContext.Provider>
  );
};

export default CheckFitProvider;