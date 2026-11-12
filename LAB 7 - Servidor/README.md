# LAB 7 — Servidor Web com Express

Servidor Node.js/Express na **porta 80**, com as páginas do portfólio e as páginas HTML das atividades existentes no repositório.

## Executar no VS Code

Instale Node.js (o Node.js 22.17 é compatível). Abra FULLSTACK_fr19 no VS Code e use Terminal → Novo Terminal:

```sh
cd "LAB 7 - Servidor"
npm ci
npm start
```

Se já abriu a pasta LAB 7 - Servidor diretamente, não precisa do comando cd.

Acesse:

- http://localhost/Home.html — portfólio com imagens.
- http://localhost/Project.html — tabela com links para as páginas.
- http://localhost/Projects.html — mesmo conteúdo da página de projetos.

A raiz `/` redireciona para Home.html. Mantenha o terminal aberto. Para parar, pressione Ctrl+C.

## Acessar de outro computador na mesma rede

1. No computador que executa o servidor, abra o Prompt do Windows e execute `ipconfig`.
2. Encontre o Endereço IPv4 da conexão ativa (Wi-Fi ou Ethernet).
3. No outro computador, conectado à mesma rede, abra `http://SEU-IP/Home.html` ou `http://SEU-IP/Project.html`.

Exemplo: se o IPv4 for 192.168.1.20, acesse http://192.168.1.20/Home.html.

O servidor escuta em 0.0.0.0 para aceitar conexões pela rede. Caso o Windows solicite, permita o Node.js no firewall para redes privadas. Redes de faculdade podem isolar dispositivos; nesse caso o administrador da rede precisa permitir a comunicação. No outro computador, localhost aponta para ele próprio: use o IP do computador servidor.

Se aparecer EADDRINUSE, a porta 80 já está em uso: encerre o outro servidor (por exemplo, o LAB 9) antes de executar este. EACCES indica que o sistema não permite usar a porta 80.

## Organização

- Servidor.js: inicia o servidor na porta 80.
- app.js: redirecionamento, arquivos estáticos e resposta 404.
- public/Home.html: página principal do portfólio.
- public/Project.html: tabela de projetos.
- public/: páginas, CSS, JavaScript e imagens.
- public/Canvas/: cópia do exercício de canvas. A pasta original foi renomeada para Exercicio Canvas na raiz do repositório.

As páginas HTML das aulas são servidas como arquivos estáticos; suas rotas de processamento de formulários pertencem às respectivas atividades e não são implementadas neste laboratório. O blog dinâmico continua separado na LAB 9.

A atividade pede acesso pela mesma rede; não precisa publicar em um serviço de hospedagem. O GitHub guarda o código e o GitHub Pages não executa este servidor Node.js.

## Entrega

https://github.com/lipepixel/FULLSTACK_fr19/tree/main/LAB%207%20-%20Servidor
