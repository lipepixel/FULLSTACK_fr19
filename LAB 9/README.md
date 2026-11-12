# LAB 9 — Blog com banco de dados

Blog para cadastrar e listar posts, usando Node.js, Express, EJS e SQLite.

## Executar no VS Code

Requer Node.js 22.13 ou superior (compatível com Node.js 22.17).
Abra a pasta LAB 9 no VS Code e execute:

```sh
npm ci
npm start
```

Se abriu a raiz do repositório, entre na pasta primeiro com `cd "LAB 9"`.

Abra **http://localhost/Projects.html** ou **http://localhost/blog**.
O servidor utiliza a porta **80**. Mantenha o terminal aberto; Ctrl+C encerra o servidor.

Clique em Abrir blog, depois em Criar novo post, preencha título, resumo e conteúdo e publique.

## Banco de dados

O arquivo `data/blog.sqlite` e a tabela `posts` são criados automaticamente. Os posts permanecem após reiniciar o servidor. Não precisa instalar MongoDB nem criar conta em serviço externo. Esta implementação usa SQLite; o enunciado fornecido não exige um banco específico.

O banco local e node_modules não são enviados ao GitHub. O Node.js 22 pode mostrar um aviso de recurso experimental para node:sqlite.

## Requisitos

| Requisito | Arquivo |
| --- | --- |
| Tabela com linha Blog e link | `public/Projects.html` |
| Botão de novos posts e listagem dinâmica de todos os posts | `views/blog.ejs` |
| Formulário de título, resumo e conteúdo | `public/cadastrar_post.html` |
| Cor de fundo e centralização | `public/style.css` |
| Express na porta 80, acessível pela rede | `server.js` |
| Raiz redireciona para projetos e /blog exibe o blog | `app.js` |
| Cadastrar post: cadastrarPost | `database.js` |
| Buscar todos: buscarTodosPosts | `database.js` |

Os textos são escapados pelo EJS, as consultas usam parâmetros e os campos são validados no servidor. As publicações mais recentes aparecem primeiro.

## Acesso na rede

Na mesma rede, use http://IP-DO-SERVIDOR/Projects.html. No Windows, descubra o IPv4 com ipconfig. Se necessário, permita o Node.js no firewall para redes privadas.

Se a porta 80 estiver em uso, encerre o outro servidor. Em sistemas que restringem portas baixas, o ambiente precisa permitir a porta 80.

## Testes

```sh
npm test
```

Verifica páginas, redirecionamento, cadastro, validação, listagem, escape de HTML, ordem e persistência do banco.

Projeto didático sem autenticação: qualquer pessoa com acesso ao formulário pode publicar. O GitHub hospeda o código; use Node.js para executar. GitHub Pages não executa Express/EJS.
