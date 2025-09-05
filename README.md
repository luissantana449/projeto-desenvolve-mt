# Projeto Desenvolve MT - Pessoas Desaparecidas

Sistema web para consulta e envio de informações sobre pessoas desaparecidas no estado de Mato Grosso. O projeto permite buscar pessoas desaparecidas, visualizar detalhes dos casos e enviar informações que possam ajudar nas investigações.

## 📋 Pré-requisitos

- Node.js versão 18 ou superior
- npm ou yarn
- Git

## 🚀 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd projeto-desenvolve-mt
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure a variável `API_BASE_URL` no arquivo `.env.local`:
   ```env
   API_BASE_URL=https://abitus-api.geia.vip
   ```

## 💻 Execução

### Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Produção

Para fazer build e executar em produção:

```bash
# Build do projeto
npm run build

# Executar em produção
npm start
```

## 🧪 Testes

O projeto conta com testes automatizados para as principais funcionalidades.

### Executar todos os testes:
```bash
npm test
```

### Executar testes em modo watch:
```bash
npm run test:watch
```

## 🌐 API

O projeto consome uma API externa para buscar dados de pessoas desaparecidas:

- **Base URL**: `https://abitus-api.geia.vip`


## 📄 Licença

Este projeto foi desenvolvido para o processo seletivo da Desenvolve MT.

---

