# Explicação dos trechos do código

Eu separei essa parte para mostrar melhor onde entra orientação a objetos no projeto.  
Não mexi no site principal, deixei esses arquivos só para apresentar a lógica por trás de algumas partes do sistema.

O arquivo principal é:

```txt
dominio-logistico.js
```

A ideia foi pegar coisas que já fazem sentido dentro do site, tipo empresa, pedido, rota, usuário e importação de arquivos, e transformar isso em classes.

## Classe e objeto

Esse trecho mostra a classe `Empresa`:

```js
class Empresa {
  constructor({ nome, cidade, estado, cnpj }) {
    this.nome = nome;
    this.cidade = cidade;
    this.estado = estado;
    this.cnpj = cnpj;
  }

  get localizacao() {
    return `${this.cidade}/${this.estado}`;
  }
}
```

Aqui a classe funciona como um modelo.  
Ela define o que uma empresa vai ter dentro do sistema: nome, cidade, estado e CNPJ.

Depois eu crio um objeto usando essa classe:

```js
const empresa = new Empresa({
  nome: "Ariam Comercio",
  cidade: "Londrina",
  estado: "PR",
  cnpj: "00.000.000/0001-00",
});
```

Então `Empresa` é a classe, e `empresa` é o objeto criado a partir dela.

## Encapsulamento

No pedido eu usei atributos privados:

```js
class Pedido {
  #status;
  #historico;

  constructor({ numero, cliente, origem, destino, pesoKg }) {
    this.numero = numero;
    this.cliente = cliente;
    this.origem = origem;
    this.destino = destino;
    this.pesoKg = pesoKg;
    this.#status = "novo";
    this.#historico = [`Pedido ${numero} criado`];
  }

  get status() {
    return this.#status;
  }
}
```

O `#status` e o `#historico` ficam protegidos dentro da classe.  
Isso evita alterar o status do pedido de qualquer jeito em outra parte do código.

Em vez de mudar direto, o pedido muda usando métodos:

```js
pedido.confirmar(usuario);
pedido.despachar(rota);
pedido.entregar();
```

Assim fica mais organizado, porque o próprio objeto `Pedido` controla o que pode acontecer com ele.

## Métodos

Os métodos são as ações que o objeto consegue fazer.

No caso do pedido, ele pode ser confirmado, despachado e entregue:

```js
confirmar(usuario) {
  this.#status = "confirmado";
  this.#historico.push(`Confirmado por ${usuario.nome}`);
}

despachar(rota) {
  this.#status = "em rota";
  this.#historico.push(`Despachado na rota ${rota.codigo}`);
}

entregar() {
  this.#status = "entregue";
  this.#historico.push("Entrega concluida");
}
```

Eu fiz assim porque parece mais com o fluxo real do sistema.  
Um pedido nasce como novo, depois pode ser confirmado, depois vai para rota e por fim é entregue.

## Herança

Aqui eu tenho uma classe mais genérica chamada `Usuario`:

```js
class Usuario {
  constructor({ nome, email }) {
    this.nome = nome;
    this.email = email;
  }

  identificar() {
    return `${this.nome} <${this.email}>`;
  }
}
```

Depois criei uma classe mais específica:

```js
class UsuarioOperacional extends Usuario {
  constructor({ nome, email, setor }) {
    super({ nome, email });
    this.setor = setor;
  }

  identificar() {
    return `${super.identificar()} - setor ${this.setor}`;
  }
}
```

O `UsuarioOperacional` herda de `Usuario`.  
Ou seja, ele já aproveita nome, email e o método `identificar()`, mas também adiciona o setor.

Usei `super()` para chamar a parte da classe pai.

## Polimorfismo

Essa parte aparece na importação dos arquivos.

Eu criei uma classe base:

```js
class ArquivoImportacao {
  constructor({ nome, tamanhoMb, linhas }) {
    this.nome = nome;
    this.tamanhoMb = tamanhoMb;
    this.linhas = linhas;
  }

  validar() {
    throw new Error("Cada tipo de arquivo precisa implementar validar().");
  }
}
```

Depois cada tipo de arquivo tem seu próprio jeito de validar:

```js
class ArquivoPDF extends ArquivoImportacao {
  validar() {
    return {
      tipo: "PDF",
      valido: this.nome.toLowerCase().endsWith(".pdf") && this.tamanhoMb <= 25,
      mensagem: "PDF validado para leitura operacional de pedidos.",
    };
  }
}
```

```js
class ArquivoXLSX extends ArquivoImportacao {
  validar() {
    return {
      tipo: "XLSX",
      valido: this.nome.toLowerCase().endsWith(".xlsx") && this.linhas <= 50000,
      mensagem: "Planilha XLSX validada para importacao em lote.",
    };
  }
}
```

```js
class ArquivoCSV extends ArquivoImportacao {
  validar() {
    return {
      tipo: "CSV",
      valido: this.nome.toLowerCase().endsWith(".csv") && this.linhas <= 50000,
      mensagem: "CSV validado para integracao simples.",
    };
  }
}
```

Todas usam o mesmo método `validar()`, mas cada uma valida de um jeito diferente.  
Isso é o polimorfismo no código.

## Composição

A `CentralLogistica` junta vários objetos:

```js
class CentralLogistica {
  #pedidos;

  constructor({ empresa, operador, importador }) {
    this.empresa = empresa;
    this.operador = operador;
    this.importador = importador;
    this.#pedidos = [];
  }

  registrarPedido(pedido) {
    pedido.confirmar(this.operador);
    this.#pedidos.push(pedido);
  }
}
```

Ela usa:

- uma empresa;
- um operador;
- um importador;
- vários pedidos.

Então ela não faz tudo sozinha.  
Ela trabalha juntando objetos diferentes, e isso é composição.

## Exemplo funcionando

Esse trecho cria a central e registra um pedido:

```js
const central = new CentralLogistica({
  empresa,
  operador,
  importador: new ImportadorArquivo(),
});

const pedido = new Pedido({
  numero: "PED-1284",
  cliente: "Mercado Norte",
  origem: "Londrina/PR",
  destino: "Salvador/BA",
  pesoKg: 840,
});

central.registrarPedido(pedido);
```

Depois o pedido é despachado em uma rota:

```js
const despacho = central.despacharPedido("PED-1284", rota);
```

Esse despacho retorna informações como rota, valor do frete e risco.

## Resumo

Eu usei orientação a objetos para organizar uma parte do sistema em classes.  
Cada classe representa alguma coisa do projeto:

- `Empresa` representa a empresa cadastrada;
- `Pedido` controla os dados e o status do pedido;
- `Rota` calcula frete e risco;
- `UsuarioOperacional` representa quem opera o sistema;
- `ArquivoPDF`, `ArquivoXLSX` e `ArquivoCSV` mostram polimorfismo;
- `CentralLogistica` junta tudo e simula a operação.

O objetivo foi deixar o código mais organizado e mais parecido com o funcionamento real do site.
