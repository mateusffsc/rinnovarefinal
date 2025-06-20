# CheckFit - Sistema de Recomendação Dental

Um sistema inteligente de recomendação de suplementos dentais baseado em questionário personalizado, desenvolvido com React, TypeScript e Supabase.

## 🦷 Sobre o Projeto

O CheckFit é uma aplicação web que oferece recomendações personalizadas de suplementos dentais através de um questionário interativo. O sistema inclui:

- **Quiz personalizado** com perguntas sobre saúde dental
- **Sistema de recomendação** baseado nas respostas do usuário
- **Dashboard administrativo** para gerenciar leads e visualizar dados
- **Interface moderna** desenvolvida com React e Tailwind CSS
- **Backend robusto** com Supabase para armazenamento de dados

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Router DOM
  - Lucide React (ícones)

- **Backend:**
  - Supabase (Database + Auth)
  - PostgreSQL

- **Ferramentas:**
  - ESLint
  - PostCSS
  - Autoprefixer

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Supabase

## ⚙️ Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/dental-checkfit.git
cd dental-checkfit
```

2. **Instale as dependências:**
```bash
cd project
npm install
```

3. **Configure o Supabase:**
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute os scripts SQL fornecidos na pasta raiz:
     - `supabase-schema.sql`
     - `create-tables.sql`

4. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na pasta `project/`
   - Adicione suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

5. **Execute o projeto:**
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
DENTAL/
├── project/                    # Aplicação React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── admin/        # Dashboard administrativo
│   │   │   └── screens/      # Telas do quiz
│   │   ├── context/          # Context API
│   │   ├── data/             # Dados estáticos
│   │   ├── lib/              # Configurações
│   │   ├── services/         # Serviços API
│   │   └── utils/            # Utilitários
│   └── package.json
├── create-tables.sql          # Script de criação de tabelas
├── supabase-schema.sql        # Schema do banco de dados
└── README.md
```

## 🎯 Funcionalidades

### Para Usuários
- ✅ Quiz interativo sobre saúde dental
- ✅ Recomendações personalizadas de suplementos
- ✅ Interface responsiva e intuitiva
- ✅ Processamento de dados em tempo real

### Para Administradores
- ✅ Dashboard de administração
- ✅ Visualização de leads capturados
- ✅ Detalhes completos das respostas dos usuários
- ✅ Sistema de autenticação

## 📊 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL via Supabase com as seguintes tabelas principais:

- **quiz_responses** - Armazena respostas dos questionários
- **leads** - Gerencia informações dos usuários
- **supplements** - Catálogo de suplementos

Consulte os arquivos SQL na raiz do projeto para mais detalhes sobre o schema.

## 🔒 Autenticação

O sistema utiliza autenticação do Supabase para proteger o dashboard administrativo. Configure as políticas RLS (Row Level Security) conforme necessário.

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Build command: `cd project && npm run build`
2. Publish directory: `project/dist`
3. Configure as variáveis de ambiente

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através dos issues do GitHub.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório! 