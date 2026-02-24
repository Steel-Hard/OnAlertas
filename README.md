# Sistema Web de Alertas Urbanos

## 🎯 Objetivo do Projeto
Desenvolver um sistema Web completo (frontend e backend) focado no gerenciamento de alertas urbanos em tempo real. A aplicação conta com uma API REST, persistência em banco de dados, uma interface Web dinâmica e um dashboard estatístico para análise dos dados.

## ⚙️ Arquitetura e Tecnologias
O projeto foi estruturado seguindo boas práticas de desenvolvimento, com:
* **Padrão de Arquitetura:** Separação clara de camadas em Model, Service e Controller.
* **Backend:** API REST com retornos HTTP adequados (ex: 201 Created).
* **Frontend:** Interface com renderização dinâmica, consumo de API via `fetch` e formulários com validação.
* **Banco de Dados:** Utilização de migrations e tabelas para persistência dos dados.
* **Dashboard:** Gráficos interativos utilizando a biblioteca Chart.js ou similar.
* **Testes de API:** Validação dos endpoints através do Postman ou Insomnia.

## 📋 Funcionalidades (Product Backlog)

O desenvolvimento foi guiado por épicos e User Stories (US) bem definidos:

### EPIC 1 - Gestão de Alertas
* **US01 - Criar Alerta:** Cadastro de ocorrência com os campos obrigatórios de tipo, descrição, local e data. Inclui validação (front e back) e persistência no banco.
* **US02 - Listar Alertas:** Exibição de todos os alertas cadastrados, ordenados por data (do mais recente para o mais antigo).
* **US03 - Filtrar Alertas:** Funcionalidade de filtro por tipo utilizando query param (`?tipo=`), com atualização dinâmica da interface.

### EPIC 2 - Gestão de Status
* **US04 - Atualizar Status:** Permite que o operador marque um alerta como "resolvido". O status (ativo/resolvido) é atualizado via endpoint `PATCH /alertas/:id` e refletido imediatamente na interface.

### EPIC 3 - Dashboard e Análise
* **US05 - Dashboard Estatístico:** Tela voltada para gestão, exibindo o total de alertas por tipo e o total de alertas ativos, acompanhados de um gráfico gerado no frontend.

## 🏃 Organização Scrum e Sprints
O desenvolvimento ocorreu de forma ágil, dividido em 4 Sprints de 40 minutos cada:
* **Sprint 1:** Arquitetura do sistema e entrega da US01 (Cadastro completo e funcionando).
* **Sprint 2:** Entrega da US02 e US03 (Listagem e Filtros).
* **Sprint 3:** Entrega da US04 (Atualização de Status).
* **Sprint 4:** Entrega da US05 (Dashboard finalizado e preparação para a Demonstração).

## ✅ Critérios de Conclusão (Definition of Done)
Para considerar o projeto finalizado, os seguintes critérios obrigatórios foram cumpridos:
* Código devidamente versionado no repositório.
* Endpoints REST operando corretamente (sem erros de servidor 500).
* Validações de dados devidamente implementadas no frontend e no backend.
* Organização do código respeitando a separação de camadas (Model / Service / Controller).
* Demonstração do sistema 100% funcional no navegador.