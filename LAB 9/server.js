const { abrirBanco } = require('./database');
const { criarApp } = require('./app');
const banco = abrirBanco();
const servidor = criarApp(banco).listen(80, '0.0.0.0', () => {
  console.log('Blog disponível em http://localhost:80');
});
servidor.on('error', (erro) => {
  console.error(`Não foi possível iniciar na porta 80: ${erro.message}`);
  banco.fechar();
  process.exitCode = 1;
});
for (const sinal of ['SIGTERM', 'SIGINT']) {
  process.on(sinal, () => servidor.close(() => { banco.fechar(); }));
}
