# LAB 8 - Cadastro e login

Precisa de Node.js e npm. No VS Code, abra `FULLSTACK_fr19` e use **Terminal → Novo Terminal**:

```powershell
cd "LAB 8"
npm.cmd ci
npm.cmd start
```

Abra [http://localhost](http://localhost). A página inicial leva aos projetos.

1. Clique em **Cadastrar usuário** e preencha nome, e-mail e senha.
2. Depois, entre com o mesmo e-mail e senha em [http://localhost/login](http://localhost/login).
3. A página EJS mostra se o login deu certo.

Os cadastros ficam na memória: ao reiniciar o servidor, precisa cadastrar de novo.

Mantenha o terminal aberto. Para parar, pressione **Ctrl+C**.

O servidor usa a **porta 80**. Pare o LAB 7 ou o LAB 9 antes de iniciar este.

Na próxima vez, basta entrar nesta pasta e executar `npm.cmd start`. O GitHub Pages não executa este servidor.
