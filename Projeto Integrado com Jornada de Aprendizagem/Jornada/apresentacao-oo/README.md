# Orientacao a Objetos - FastAriam

Estes arquivos foram criados apenas para apresentacao da Jornada.
Eles nao alteram o site principal.

## Arquivos

- `dominio-logistico.js`: classes do dominio logistico do site.
- `demo-orientacao-objetos.html`: pagina simples para abrir no navegador e ver os objetos funcionando.

## Conceitos demonstrados

- Classe e objeto: `Pedido`, `Rota`, `Empresa`, `Usuario`.
- Encapsulamento: campos privados como `#status`, `#historico` e `#pedidos`.
- Heranca: `UsuarioOperacional` herda de `Usuario`.
- Polimorfismo: `ArquivoPDF`, `ArquivoXLSX` e `ArquivoCSV` implementam o mesmo metodo `validar()`.
- Composicao: `CentralLogistica` usa objetos de `Empresa`, `Pedido`, `Rota` e `ImportadorArquivo`.
- Metodos: acoes como `confirmar()`, `despachar()`, `entregar()`, `calcularScore()`.

## Como apresentar

1. Abra `demo-orientacao-objetos.html` no navegador.
2. Mostre o resultado visual dos objetos criados.
3. Abra `dominio-logistico.js` para explicar as classes.

