# **Food Explorer Backend**

Desafio final proposto pelo curso da Rocketseat feito por mim, disponível [aqui]().

[Repositório do frontend](https://github.com/Felipe-Borba/food-explorer-backend)

---

# **Instruções**

1. É importante que todas as instruções do desafio sejam lidas com muita atenção, já que a avaliação desse projeto, irá garantir a sua certificação aqui no Explorer;

2. Use o link do Figma como base para o projeto. Também disponibilizamos para download todos os assets necessários;

3. O link do Figma possui o layout de uma aplicação completa que vai desde a visualização de um prato até o pagamento do mesmo. Algumas funcionalidades mais simples, serão obrigatórias e corrigidas enquanto as funcionalidades envolvendo todo o processo de pedidos, serão classificadas como milha extra, logo, não passarão por uma correção.

4. O foodExplorer terá duas personas: o administrador e o usuário;

5. É necessário se autenticar para entrar na aplicação através da tela de login;

6. O admin é a pessoa responsável pelo restaurante, logo, poderá criar, visualizar, editar e apagar um prato a qualquer momento. Cada prato deve conter uma imagem, um nome, uma breve descrição, os ingredientes e o seu preço. Ao clicar em adicionar prato, o admin receberá uma mensagem de sucesso e será redirecionado para a página principal;

7. O usuário irá visualizar todos os pratos cadastrados e, quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.

8. Tanto o admin quanto o usuário poderão buscar os pratos por nome e/ou ingredientes;

---

# **Critérios de Avaliação**

## Obrigatórios

- [x] Atende a todas as especificações descritas

- [x] Um projeto estruturado, com uma boa organização das pastas, divisão de componentes no front-end, etc.

- [x] Um arquivo README.md com as especificações sobre como executar o projeto em um ambiente dev.

- [x] Os usuários deverão se autenticar para entrar na aplicação através da tela de login, você pode aplicar o que aprendeu nas aulas de autenticação JWT. A autenticação deve ser validada com senha.

- [x] O admin irá fazer upload de imagens para cadastrar os pratos.

- [x] Para finalizar, faça o deploy da sua aplicação.

- [x] Dê nomes significativos para as suas funções e variáveis: trabalhe um pouco com os conceitos do Clean Code.

- [x] Os dados do admin, do restaurante e dos usuários serão armazenados em um banco de dados.

- [x] Possibilidade de fazer uma busca pelo nome do prato

- [x] É essencial que a sua interface consuma a sua própria API.

- [x] Interessante deixar a aplicação responsiva: utilize o conceito de Mobile First que foi aprendido em aula.

- [x] Fica a seu critério onde aplicar animações, transições e transformações.

- [x] Atende ao modelo proposto no Figma e contém elementos indicativos de ação e estado.

## Opcionais

- [ ] O usuário poderá incluir itens no carrinho, clicando no botão incluir. Já a quantidade é controlada pelos botões “-” e “+”;

- [ ] Ao clicar no botão meu pedido, o usuário será redirecionado para uma tela onde irá ver o seu pedido, a soma e os métodos de pagamento;

- [ ] O usuário poderá excluir um prato do carrinho e o valor total do pedido deve ser atualizado automaticamente;

- [ ] O usuário poderá marcar um prato como favorito, basta clicar no coração que aparece ao lado de cada um;

- [ ] O admin irá visualizar e controlar o status de cada pedido, por um campo do tipo select. Os pedidos irão aparecer em uma tabela ao clicar em Pedidos;

- [ ] O admin irá visualizar e controlar o status de cada pedido, por um campo do tipo select. Os pedidos irão aparecer em uma tabela ao clicar em Pedidos;

- [ ] Já que o projeto está em dark mode, você pode aplicar a versão light mode;

- [ ] Você pode adicionar quaisquer novas funcionalidades no seu projeto. Se desafie.

---

# **Como Executar em Ambiente de Desenvolvimento**

## Dependências

- [Node 18.12.1](https://git-scm.com/)
- [yarn 3.3.0](https://yarnpkg.com/getting-started/install)
- [Git 2.34.1](https://nodejs.org/en/)

## Executando o projeto

Clone o repositório

```bash
git clone https://github.com/Felipe-Borba/food-explorer-backend.git
```

Entre dentro do projeto clonado

```bash
cd rocket-movies-back-end
```

Instale as dependências do projeto

```bash
yarn
```

Configure as variáveis de ambiente

> Crie um arquivo chamado .env com base no arquivo .env.example

```bash
cp .env.example .env
```

Rode o projeto backend

```bash
yarn dev
```
