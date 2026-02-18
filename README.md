# Formulário de login 

<img width="834" height="503" alt="image" src="https://github.com/user-attachments/assets/21afe5e4-7682-44f8-9fd3-07f399fa0175" />



Aplicação Angular com **autenticação JWT**, acessibilidade seguindo padrões **WCAG** e cobertura de **testes unitários**.
 
**Acesse o projeto:** [https://login-jwt-alpha.vercel.app/](https://login-jwt-alpha.vercel.app/)

Este projeto foi gerado usando o [Angular CLI](https://github.com/angular/angular-cli) versão 21.0.5.


## 🚀 Recursos implementados

- **Autenticação com JWT** (JSON Web Token)
- **Rotas protegidas** via `authGuard`
- **Componentes standalone** (Angular 21)
- **Testes unitários** com **Jasmine/Karma**
- **Cobertura de testes** configurada com regras mínimas:
  - Statements: 80%
  - Branches: 70%
  - Functions: 80%
  - Lines: 80%
- **Acessibilidade** seguindo padrões **WCAG**, incluindo:
  - Uso correto de roles e labels (ARIA)
  - Contraste de cores adequado
  - Navegação por teclado (tabindex e gerenciamento de foco)
  - Feedback visual de foco (`focus-visible`)

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão >= 22
- [Angular CLI](https://angular.dev/cli) versão 21
- NPM ou Yarn

## 🛠️ Instalação

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/DevDiana/login-jwt.git
cd login-jwt
npm install
```

## 💻 Rodando a aplicação

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```
Abra o navegador em http://localhost:4200/. A aplicação recarrega automaticamente sempre que você altera algum arquivo fonte.

## 📦 Build da aplicação
Para gerar a build de produção:

```bash
ng build --configuration production
```
Os arquivos compilados serão salvos na pasta dist/.


## 🧪 Testes unitários
Para executar os testes unitários com Jasmine/Karma:

```bash
ng test
```
A cobertura de testes será exibida no console e também gerada na pasta ./coverage.
