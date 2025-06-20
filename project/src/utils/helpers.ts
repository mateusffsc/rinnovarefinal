interface UserData {
  weight: string;
  height: string;
}

interface Scores {
  higiene: number;
  carie: number;
  gengiva: number;
  inflamacao: number;
  sensibilidade: number;
  desgaste: number;
  bruxismo: number;
  prevencao: number;
  halitose: number;
  atm: number;
  estetica: number;
}

interface RiskLevel {
  level: string;
  color: string;
  bg: string;
}

interface IMCStatus {
  status: string;
  color: string;
}

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return value;
};

export const calculateIMC = (userData: UserData): string => {
  const weight = parseFloat(userData.weight);
  const height = parseFloat(userData.height) / 100;
  const imc = weight / (height * height);
  return imc.toFixed(1);
};

export const getIMCStatus = (imc: number): IMCStatus => {
  if (imc < 18.5) return { status: "Abaixo do peso", color: "text-yellow-600" };
  if (imc < 25) return { status: "Peso normal", color: "text-green-600" };
  if (imc < 30) return { status: "Sobrepeso", color: "text-yellow-600" };
  if (imc < 35) return { status: "Obesidade Grau I", color: "text-orange-600" };
  if (imc < 40) return { status: "Obesidade Grau II", color: "text-red-600" };
  return { status: "Obesidade Grau III", color: "text-red-800" };
};

export const getRiskLevel = (scores: Scores): RiskLevel => {
  const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
  if (totalScore >= 25) return { level: "CRÍTICO", color: "text-red-600", bg: "bg-red-50" };
  if (totalScore >= 15) return { level: "ALTO", color: "text-orange-600", bg: "bg-orange-50" };
  if (totalScore >= 10) return { level: "MODERADO", color: "text-yellow-600", bg: "bg-yellow-50" };
  return { level: "BAIXO", color: "text-green-600", bg: "bg-green-50" };
};

export const getDiagnosis = (scores: Scores): string => {
  const issues = [];
  
  if (scores.higiene >= 4) issues.push("higiene bucal severamente comprometida");
  else if (scores.higiene >= 2) issues.push("higiene bucal inadequada");
  
  if (scores.carie >= 4) issues.push("alto risco de cáries");
  else if (scores.carie >= 2) issues.push("risco moderado de cáries");
  
  if (scores.gengiva >= 4) issues.push("problema gengival grave");
  else if (scores.gengiva >= 2) issues.push("gengivite leve");
  
  if (scores.sensibilidade >= 4) issues.push("sensibilidade dental severa");
  else if (scores.sensibilidade >= 2) issues.push("sensibilidade dental moderada");
  
  if (scores.bruxismo >= 4) issues.push("bruxismo severo");
  else if (scores.bruxismo >= 2) issues.push("sinais de bruxismo");
  
  return issues.length > 0 ? issues.join(", ") : "saúde bucal satisfatória";
};