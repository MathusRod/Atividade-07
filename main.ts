// CLASSE Pessoa
class Pessoa {
  private _nome: string;
  private _idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    CadastroValidator.validarNome(valor);
    this._nome = valor;
  }

  get idade(): number {
    return this._idade;
  }

  set idade(valor: number) {
    CadastroValidator.verificarIdade(valor);
    this._idade = valor;
  }

  mostrarDados(): string {
    return `\nDADOS\n\tNome: ${this.nome}\n\tIdade: ${this.idade}`;
  }
}

// CLASSE Cidadao
class Cidadao extends Pessoa {
  private _telefone: string;
  private _email: string;
  private _cpf: string;
  agendamentoVacina: string | null;

  constructor(nome: string = '', idade: number = 0, telefone: string = '', email: string = '', cpf: string = '') {
    super(nome, idade);
    this.telefone = telefone;
    this.email = email;
    this.cpf = cpf;
    this.agendamentoVacina = null;
  }

  get telefone(): string {
    return this._telefone;
  }

  set telefone(valor: string) {
    CadastroValidator.validarTelefone(valor);
    this._telefone = valor;
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    CadastroValidator.validarEmail(valor);
    this._email = valor;
  }

  get cpf(): string {
    return this._cpf;
  }

  set cpf(valor: string) {
    CadastroValidator.validarCpf(valor);
    this._cpf = valor;
  }

  mostrarDados(): string {
    let agendamento: string = "Sem agendamento";
    if (this.agendamentoVacina) {
      agendamento = this.agendamentoVacina;
    }
    return (
      super.mostrarDados() +
      `\n\tTelefone: ${this.telefone}\n\tE-mail: ${this.email}\n\tCPF: ${this.cpf}\n\tAgendamento: ${agendamento}`
    );
  }

  agendarVacina(data: string, funcionario_escolhido: string) {
    if (CadastroValidator.validarData(data, true)) {
      this.agendamentoVacina = `${data} Agendado por: ${funcionario_escolhido}`;
    } else {
      throw new Error("Data inválida para agendamento.");
    }
  }
}

// CLASSE Funcionario
class Funcionario extends Pessoa {
  private _cargo: string;
  private _salario: number;

  constructor(nome: string ='', idade: number = 0, cargo: string = '', salario: number = 0) {
    super(nome, idade);
    this.cargo = cargo;
    this.salario = salario;
  }

  get cargo(): string {
    return this._cargo;
  }

  set cargo(valor: string) {
    this._cargo = valor;
  }

  get salario(): number {
    return this._salario;
  }

  set salario(valor: number) {
    CadastroValidator.validarSalario(valor);
    this._salario = valor;
  }

  mostrarDados(): string {
    return (
      super.mostrarDados() +
      `\n\tCargo: ${this.cargo}\n\tSalário: ${this.salario}`
    );
  }
}

// CLASSE CadastroValidator
class CadastroValidator {

  static verificarIdade(idade: number): boolean {
    if (idade > 0 && idade < 200) {
      return true;
    }
    throw new Error("Idade inválida! Deve ser maior que 0 e menor que 200.");
  }

  static validarNome(nome: string): boolean {
    const nomeRegex = /^[a-zA-Z\s]+$/;
    if (nomeRegex.test(nome)) {
      return true;
    }
    throw new Error("Nome inválido! Apenas letras e espaços são permitidos.");
  }

  static validarTelefone(telefone: string): boolean {
    const telefoneRegex = /^\d{4}-\d{4}$/;
    if (telefoneRegex.test(telefone)) {
      return true;
    }
    throw new Error("Telefone inválido! Deve estar no formato XXXX-XXXX.");
  }

  static validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return true;
    }
    throw new Error("E-mail inválido! Deve estar no formato padrão de e-mail.");
  }

  static validarCpf(cpf: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (cpfRegex.test(cpf)) {
      return true;
    }
    throw new Error("CPF inválido! Deve estar no formato XXX.XXX.XXX-XX.");
  }

  static validarData(data: string, isFuturo: boolean): boolean {
    const dataAtual = new Date();
    const dataInformada = new Date(data);
    if (isFuturo && dataInformada > dataAtual) {
      return true;
    } else if (!isFuturo && dataInformada < dataAtual) {
      return true;
    }
    return false;
  }

  static validarSalario(salario: number): boolean {
    if (salario > 0) {
      return true;
    }
    throw new Error("Salário inválido! Deve ser um valor positivo.");
  }
}

// CLASSE CadastroService
class CadastroService {
  registrarCidadao() {
    try {
      const nome: string = prompt(`Qual o nome do cidadão?`);
      const idade: number = parseInt(prompt(`Qual a idade de ${nome}?`));
      const telefone: string = prompt(
        `Qual o telefone de ${nome}?\nAVISO: SOMENTE OS 8 DIGITOS COM UM HÍFEN NO MEIO`
      );
      const email: string = prompt(`Qual o E-mail de ${nome}`);
      const cpf: string = prompt(`Qual o CPF de ${nome}? Formato: XXX.XXX.XXX-XX`);

      const novo_cidadao = new Cidadao(nome, idade, telefone, email, cpf);
      cidadao_array.push(novo_cidadao);
      
      console.log(cidadao_array);
    } catch (error) {
      alert(`Erro no cadastro do cidadão: ${error.message}`);
    }
  }

  removerCidadao() {
    let texto = "Qual cidadão você deseja remover:\n";
    cidadao_array.forEach((cidA, index) => {
      texto += `(${index}) - ${cidA.nome}\n`;
    });
    const res: number = parseInt(prompt(texto));
    if (res >= 0 && res < cidadao_array.length) {
      cidadao_array = cidadao_array.filter((_, index) => index !== res);
      alert("Cadastro removido com sucesso!");
    } else alert("Valor inválido!");
  }

  buscarCidadao(nomeProcurado: string) {
    let cidadao_encontrado: object | string = "Nenhum cidadão encontrado";
    cidadao_array.forEach((cidA) => {
      if (cidA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
        cidadao_encontrado = cidA.mostrarDados();
      }
    });
    return cidadao_encontrado;
  }

  registrarFuncionario() {
    try {
      const nome: string = prompt(`Qual o nome do funcionário?`);
      const idade: number = parseInt(prompt(`Qual a idade de ${nome}?`));
      const cargo: string = "Cadastrador";
      const salario: number = parseInt(prompt(`Qual o salário de ${nome}`));

      const novo_funcionario = new Funcionario(nome, idade, cargo, salario);
      funcionario_array.push(novo_funcionario);
      
      console.log(funcionario_array);
    } catch (error) {
      alert(`Erro no cadastro do funcionário: ${error.message}`);
    }
  }

  removerFuncionario() {
    let texto = "Qual funcionário você deseja remover:\n";
    funcionario_array.forEach((funcA, index) => {
      texto += `(${index}) - ${funcA.nome}\n`;
    });
    const res: number = parseInt(prompt(texto));
    if (res >= 0 && res < funcionario_array.length) {
      funcionario_array = funcionario_array.filter((_, index) => index !== res);
      alert("Funcionário removido com sucesso!");
    } else alert("Valor inválido!");
  }

  buscarFuncionario(nomeProcurado: string) {
    let funcionario_encontrado: object | string = "Nenhum funcionário encontrado";
    funcionario_array.forEach((funcA) => {
      if (funcA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
        funcionario_encontrado = funcA.mostrarDados();
      }
    });
    return funcionario_encontrado;
  }

  agendamento() {
    const funcionario_escolhido: string = prompt(
      `Escolha um funcionário:\n${this.showLista(funcionario_array)}`
    );
    const res: number =
    parseInt(
      prompt(
        `Qual cidadão deseja ter um agendamento?\n${this.showLista(cidadao_array)}`
      )
    ) - 1;
  
  if (res >= 0 && res < cidadao_array.length) {
    const data: string = prompt(
      "Qual a data do agendamento?\nColoque dessa forma AAAA-MM-DD"
    );
    
    try {
      cidadao_array[res].agendarVacina(data, funcionario_escolhido);
      alert("Agendamento realizado com sucesso!");
    } catch (error) {
      alert(`Erro no agendamento: ${error.message}`);
    }
  } else {
    alert("Cidadão não encontrado.");
  }
}

showLista(type: any[]): string {
  let texto = "LISTA\n------------------\n";
  type.forEach((t, index) => {
    texto += `\nID: ${index + 1} | Nome: ${t.nome}\n`;
  });
  texto += `\n------------------`;

  return texto;
}
}

// Constantes usadas para chamar algum método ou variável das classes
const _funcionario = new Funcionario();
const _cidadao = new Cidadao();
const _cadastroService = new CadastroService();

// Funções ativadas pelos botões do HTML. A funcionalidade dela é para chamar os métodos
function addCidadao() {
_cadastroService.registrarCidadao();
}

function removerCidadao() {
_cadastroService.removerCidadao();
}

function buscarCidadao() {
const res = prompt(
  `Qual você deseja buscar?\n${_cadastroService.showLista(cidadao_array)}\nDigite o nome.`
);
alert(_cadastroService.buscarCidadao(res));
}

function agendarUmaVacina() {
_cadastroService.agendamento();
}

function addFuncionario() {
_cadastroService.registrarFuncionario();
}

function removerFuncionario() {
_cadastroService.removerFuncionario();
}

function buscarFuncionario() {
const res = prompt(
  `Qual você deseja buscar?\n${_cadastroService.showLista(funcionario_array)}\nDigite o nome.`
);
alert(_cadastroService.buscarFuncionario(res));
}

// Adicionei logo de início um cidadão cadastrado caso queira verificar a lista sem cadastrar algum cidadão
let cidadao_array: Cidadao[] = [];
cidadao_array.push(new Cidadao("Carlos", 23, "8898-9807", "carlos@obrigado.com", "123.456.789-00"));

// Fiz o mesmo com um funcionário
let funcionario_array: Funcionario[] = [];
funcionario_array.push(new Funcionario("Matheus", 19, "Cadastrador", 2000));
