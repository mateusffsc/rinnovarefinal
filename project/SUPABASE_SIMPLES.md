# 🚀 Integração Supabase - Simples e Automática

## ✅ O que foi configurado:

1. **Arquivo `.env`** com as credenciais do Supabase
2. **Setup automático** das tabelas no banco
3. **Integração completa** no sistema

## 🎯 Como usar:

### 1. Execute a aplicação:
```bash
npm run dev
```

### 2. Pronto! 
- As tabelas serão criadas automaticamente
- Os dados serão salvos no Supabase
- Dashboard carregará dados do banco

## 📊 Tabelas criadas automaticamente:

- **`leads`** - Dados dos pacientes
- **`lead_scores`** - Scores por categoria  
- **`lead_answers`** - Respostas do questionário

## 🔧 Arquivos principais:

- **`.env`** - Credenciais do Supabase
- **`src/lib/supabase.ts`** - Cliente configurado
- **`src/services/supabaseService.ts`** - Funções de banco
- **`src/utils/setupDatabase.ts`** - Setup automático

## 📈 Como funciona:

1. **Aplicação inicia** → Setup automático das tabelas
2. **Paciente completa avaliação** → Dados salvos no Supabase
3. **Dashboard admin** → Dados carregados do Supabase

## 🎉 Benefícios:

✅ **Zero configuração manual**  
✅ **Setup automático**  
✅ **Dados seguros no Supabase**  
✅ **Escalabilidade infinita**  

**Tudo funcionando automaticamente!** 🚀 