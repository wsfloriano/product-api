```markdown
# Product API

Este é o backend de uma aplicação para gerenciar produtos, construído com NestJS e TypeScript e preparado para usar a base de dados conforme modelo enviado.

## Funcionalidades

- **CRUD de Produtos**: Criação, leitura, atualização e exclusão de produtos.
- **Upload de Imagens**: Upload de imagens para os produtos.
- **Paginação**: Paginação dos produtos na listagem.
- **Pesquisa**: Pesquisa de produtos pelo nome.
- **Configuração via `.env`**: Configurações de ambiente utilizando variáveis no arquivo `.env`.

## Requisitos

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/wsfloriano/product-api.git
   cd seu-repositorio/backend
   ```

2. **Instale as dependências:**

   Com npm:

   ```bash
   npm install
   ```

   Com Yarn:

   ```bash
   yarn install
   ```

## Uso

### Rodando o servidor

Com npm:

```bash
npm run start:dev
```

Com Yarn:

```bash
yarn start:dev
```

O servidor estará rodando em [http://localhost:8001](http://localhost:8001).

### Endpoints

- `GET /products`: Lista todos os produtos.
- `GET /products/:id`: Obtém detalhes de um produto específico.
- `POST /products`: Cria um novo produto.
- `PUT /products/:id`: Atualiza um produto existente.
- `DELETE /products/:id`: Remove um produto.
- `POST /products/upload`: Faz o upload de uma imagem.

A conexão  com o banco de dados está configurada em "src/utils/ormconfig.ts"

### Exemplo de Requisição

Para criar um produto com imagem:

```bash
curl -X POST http://localhost:8001/products \
  -H "Content-Type: multipart/form-data" \
  -F "name=Nome do Produto" \
  -F "brand=Marca do Produto" \
  -F "price=100.00" \
  -F "image=http://localhost:8001/public/upload/imagem.jpg"
```

## Deploy

Assegure-se de configurar as variáveis de ambiente corretamente no servidor de produção. Você pode usar o seguinte comando para rodar o servidor em modo de produção:

```bash
npm run build
npm run start:prod
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

Este `README.md` fornece uma visão geral completa do seu backend, incluindo a instalação, configuração, uso e detalhes sobre os endpoints disponíveis.