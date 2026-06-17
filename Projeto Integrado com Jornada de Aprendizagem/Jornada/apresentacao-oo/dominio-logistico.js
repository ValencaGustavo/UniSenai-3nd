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

class Usuario {
  constructor({ nome, email }) {
    this.nome = nome;
    this.email = email;
  }

  identificar() {
    return `${this.nome} <${this.email}>`;
  }
}

class UsuarioOperacional extends Usuario {
  constructor({ nome, email, setor }) {
    super({ nome, email });
    this.setor = setor;
  }

  identificar() {
    return `${super.identificar()} - setor ${this.setor}`;
  }
}

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

  get historico() {
    return [...this.#historico];
  }

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
}

class Rota {
  constructor({ codigo, origem, destino, distanciaKm, prazoHoras }) {
    this.codigo = codigo;
    this.origem = origem;
    this.destino = destino;
    this.distanciaKm = distanciaKm;
    this.prazoHoras = prazoHoras;
  }

  calcularFrete(pedido) {
    const base = 48;
    const custoPorKm = 1.42;
    const custoPorKg = 0.85;
    return Number((base + this.distanciaKm * custoPorKm + pedido.pesoKg * custoPorKg).toFixed(2));
  }

  calcularScore() {
    const velocidadeMedia = this.distanciaKm / this.prazoHoras;
    if (velocidadeMedia > 72) return "critico";
    if (velocidadeMedia > 56) return "atencao";
    return "normal";
  }
}

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

class ArquivoPDF extends ArquivoImportacao {
  validar() {
    return {
      tipo: "PDF",
      valido: this.nome.toLowerCase().endsWith(".pdf") && this.tamanhoMb <= 25,
      mensagem: "PDF validado para leitura operacional de pedidos.",
    };
  }
}

class ArquivoXLSX extends ArquivoImportacao {
  validar() {
    return {
      tipo: "XLSX",
      valido: this.nome.toLowerCase().endsWith(".xlsx") && this.linhas <= 50000,
      mensagem: "Planilha XLSX validada para importacao em lote.",
    };
  }
}

class ArquivoCSV extends ArquivoImportacao {
  validar() {
    return {
      tipo: "CSV",
      valido: this.nome.toLowerCase().endsWith(".csv") && this.linhas <= 50000,
      mensagem: "CSV validado para integracao simples.",
    };
  }
}

class ImportadorArquivo {
  validarArquivos(arquivos) {
    return arquivos.map((arquivo) => arquivo.validar());
  }
}

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

  despacharPedido(numero, rota) {
    const pedido = this.#pedidos.find((item) => item.numero === numero);
    if (!pedido) return null;

    pedido.despachar(rota);
    return {
      pedido,
      rota,
      frete: rota.calcularFrete(pedido),
      risco: rota.calcularScore(),
    };
  }

  gerarResumo() {
    return {
      empresa: this.empresa.nome,
      hq: this.empresa.localizacao,
      operador: this.operador.identificar(),
      totalPedidos: this.#pedidos.length,
      pedidos: this.#pedidos.map((pedido) => ({
        numero: pedido.numero,
        cliente: pedido.cliente,
        status: pedido.status,
        historico: pedido.historico,
      })),
    };
  }
}

export {
  ArquivoCSV,
  ArquivoPDF,
  ArquivoXLSX,
  CentralLogistica,
  Empresa,
  ImportadorArquivo,
  Pedido,
  Rota,
  Usuario,
  UsuarioOperacional,
};
