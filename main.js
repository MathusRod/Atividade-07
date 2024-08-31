var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// CLASSE Pessoa
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    Object.defineProperty(Pessoa.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (valor) {
            CadastroValidator.validarNome(valor);
            this._nome = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pessoa.prototype, "idade", {
        get: function () {
            return this._idade;
        },
        set: function (valor) {
            CadastroValidator.verificarIdade(valor);
            this._idade = valor;
        },
        enumerable: false,
        configurable: true
    });
    Pessoa.prototype.mostrarDados = function () {
        return "\nDADOS\n\tNome: ".concat(this.nome, "\n\tIdade: ").concat(this.idade);
    };
    return Pessoa;
}());
// CLASSE Cidadao
var Cidadao = /** @class */ (function (_super) {
    __extends(Cidadao, _super);
    function Cidadao(nome, idade, telefone, email, cpf) {
        if (nome === void 0) { nome = ''; }
        if (idade === void 0) { idade = 0; }
        if (telefone === void 0) { telefone = ''; }
        if (email === void 0) { email = ''; }
        if (cpf === void 0) { cpf = ''; }
        var _this = _super.call(this, nome, idade) || this;
        _this.telefone = telefone;
        _this.email = email;
        _this.cpf = cpf;
        _this.agendamentoVacina = null;
        return _this;
    }
    Object.defineProperty(Cidadao.prototype, "telefone", {
        get: function () {
            return this._telefone;
        },
        set: function (valor) {
            CadastroValidator.validarTelefone(valor);
            this._telefone = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cidadao.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (valor) {
            CadastroValidator.validarEmail(valor);
            this._email = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cidadao.prototype, "cpf", {
        get: function () {
            return this._cpf;
        },
        set: function (valor) {
            CadastroValidator.validarCpf(valor);
            this._cpf = valor;
        },
        enumerable: false,
        configurable: true
    });
    Cidadao.prototype.mostrarDados = function () {
        var agendamento = "Sem agendamento";
        if (this.agendamentoVacina) {
            agendamento = this.agendamentoVacina;
        }
        return (_super.prototype.mostrarDados.call(this) +
            "\n\tTelefone: ".concat(this.telefone, "\n\tE-mail: ").concat(this.email, "\n\tCPF: ").concat(this.cpf, "\n\tAgendamento: ").concat(agendamento));
    };
    Cidadao.prototype.agendarVacina = function (data, funcionario_escolhido) {
        if (CadastroValidator.validarData(data, true)) {
            this.agendamentoVacina = "".concat(data, " Agendado por: ").concat(funcionario_escolhido);
        }
        else {
            throw new Error("Data inválida para agendamento.");
        }
    };
    return Cidadao;
}(Pessoa));
// CLASSE Funcionario
var Funcionario = /** @class */ (function (_super) {
    __extends(Funcionario, _super);
    function Funcionario(nome, idade, cargo, salario) {
        if (nome === void 0) { nome = ''; }
        if (idade === void 0) { idade = 0; }
        if (cargo === void 0) { cargo = ''; }
        if (salario === void 0) { salario = 0; }
        var _this = _super.call(this, nome, idade) || this;
        _this.cargo = cargo;
        _this.salario = salario;
        return _this;
    }
    Object.defineProperty(Funcionario.prototype, "cargo", {
        get: function () {
            return this._cargo;
        },
        set: function (valor) {
            this._cargo = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Funcionario.prototype, "salario", {
        get: function () {
            return this._salario;
        },
        set: function (valor) {
            CadastroValidator.validarSalario(valor);
            this._salario = valor;
        },
        enumerable: false,
        configurable: true
    });
    Funcionario.prototype.mostrarDados = function () {
        return (_super.prototype.mostrarDados.call(this) +
            "\n\tCargo: ".concat(this.cargo, "\n\tSal\u00E1rio: ").concat(this.salario));
    };
    return Funcionario;
}(Pessoa));
// CLASSE CadastroValidator
var CadastroValidator = /** @class */ (function () {
    function CadastroValidator() {
    }
    CadastroValidator.verificarIdade = function (idade) {
        if (idade > 0 && idade < 200) {
            return true;
        }
        throw new Error("Idade inválida! Deve ser maior que 0 e menor que 200.");
    };
    CadastroValidator.validarNome = function (nome) {
        var nomeRegex = /^[a-zA-Z\s]+$/;
        if (nomeRegex.test(nome)) {
            return true;
        }
        throw new Error("Nome inválido! Apenas letras e espaços são permitidos.");
    };
    CadastroValidator.validarTelefone = function (telefone) {
        var telefoneRegex = /^\d{4}-\d{4}$/;
        if (telefoneRegex.test(telefone)) {
            return true;
        }
        throw new Error("Telefone inválido! Deve estar no formato XXXX-XXXX.");
    };
    CadastroValidator.validarEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return true;
        }
        throw new Error("E-mail inválido! Deve estar no formato padrão de e-mail.");
    };
    CadastroValidator.validarCpf = function (cpf) {
        var cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (cpfRegex.test(cpf)) {
            return true;
        }
        throw new Error("CPF inválido! Deve estar no formato XXX.XXX.XXX-XX.");
    };
    CadastroValidator.validarData = function (data, isFuturo) {
        var dataAtual = new Date();
        var dataInformada = new Date(data);
        if (isFuturo && dataInformada > dataAtual) {
            return true;
        }
        else if (!isFuturo && dataInformada < dataAtual) {
            return true;
        }
        return false;
    };
    CadastroValidator.validarSalario = function (salario) {
        if (salario > 0) {
            return true;
        }
        throw new Error("Salário inválido! Deve ser um valor positivo.");
    };
    return CadastroValidator;
}());
// CLASSE CadastroService
var CadastroService = /** @class */ (function () {
    function CadastroService() {
    }
    CadastroService.prototype.registrarCidadao = function () {
        try {
            var nome = prompt("Qual o nome do cidad\u00E3o?");
            var idade = parseInt(prompt("Qual a idade de ".concat(nome, "?")));
            var telefone = prompt("Qual o telefone de ".concat(nome, "?\nAVISO: SOMENTE OS 8 DIGITOS COM UM H\u00CDFEN NO MEIO"));
            var email = prompt("Qual o E-mail de ".concat(nome));
            var cpf = prompt("Qual o CPF de ".concat(nome, "? Formato: XXX.XXX.XXX-XX"));
            var novo_cidadao = new Cidadao(nome, idade, telefone, email, cpf);
            cidadao_array.push(novo_cidadao);
            console.log(cidadao_array);
        }
        catch (error) {
            alert("Erro no cadastro do cidad\u00E3o: ".concat(error.message));
        }
    };
    CadastroService.prototype.removerCidadao = function () {
        var texto = "Qual cidadão você deseja remover:\n";
        cidadao_array.forEach(function (cidA, index) {
            texto += "(".concat(index, ") - ").concat(cidA.nome, "\n");
        });
        var res = parseInt(prompt(texto));
        if (res >= 0 && res < cidadao_array.length) {
            cidadao_array = cidadao_array.filter(function (_, index) { return index !== res; });
            alert("Cadastro removido com sucesso!");
        }
        else
            alert("Valor inválido!");
    };
    CadastroService.prototype.buscarCidadao = function (nomeProcurado) {
        var cidadao_encontrado = "Nenhum cidadão encontrado";
        cidadao_array.forEach(function (cidA) {
            if (cidA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
                cidadao_encontrado = cidA.mostrarDados();
            }
        });
        return cidadao_encontrado;
    };
    CadastroService.prototype.registrarFuncionario = function () {
        try {
            var nome = prompt("Qual o nome do funcion\u00E1rio?");
            var idade = parseInt(prompt("Qual a idade de ".concat(nome, "?")));
            var cargo = "Cadastrador";
            var salario = parseInt(prompt("Qual o sal\u00E1rio de ".concat(nome)));
            var novo_funcionario = new Funcionario(nome, idade, cargo, salario);
            funcionario_array.push(novo_funcionario);
            console.log(funcionario_array);
        }
        catch (error) {
            alert("Erro no cadastro do funcion\u00E1rio: ".concat(error.message));
        }
    };
    CadastroService.prototype.removerFuncionario = function () {
        var texto = "Qual funcionário você deseja remover:\n";
        funcionario_array.forEach(function (funcA, index) {
            texto += "(".concat(index, ") - ").concat(funcA.nome, "\n");
        });
        var res = parseInt(prompt(texto));
        if (res >= 0 && res < funcionario_array.length) {
            funcionario_array = funcionario_array.filter(function (_, index) { return index !== res; });
            alert("Funcionário removido com sucesso!");
        }
        else
            alert("Valor inválido!");
    };
    CadastroService.prototype.buscarFuncionario = function (nomeProcurado) {
        var funcionario_encontrado = "Nenhum funcionário encontrado";
        funcionario_array.forEach(function (funcA) {
            if (funcA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
                funcionario_encontrado = funcA.mostrarDados();
            }
        });
        return funcionario_encontrado;
    };
    CadastroService.prototype.agendamento = function () {
        var funcionario_escolhido = prompt("Escolha um funcion\u00E1rio:\n".concat(this.showLista(funcionario_array)));
        var res = parseInt(prompt("Qual cidad\u00E3o deseja ter um agendamento?\n".concat(this.showLista(cidadao_array)))) - 1;
        if (res >= 0 && res < cidadao_array.length) {
            var data = prompt("Qual a data do agendamento?\nColoque dessa forma AAAA-MM-DD");
            try {
                cidadao_array[res].agendarVacina(data, funcionario_escolhido);
                alert("Agendamento realizado com sucesso!");
            }
            catch (error) {
                alert("Erro no agendamento: ".concat(error.message));
            }
        }
        else {
            alert("Cidadão não encontrado.");
        }
    };
    CadastroService.prototype.showLista = function (type) {
        var texto = "LISTA\n------------------\n";
        type.forEach(function (t, index) {
            texto += "\nID: ".concat(index + 1, " | Nome: ").concat(t.nome, "\n");
        });
        texto += "\n------------------";
        return texto;
    };
    return CadastroService;
}());
// Constantes usadas para chamar algum método ou variável das classes
var _funcionario = new Funcionario();
var _cidadao = new Cidadao();
var _cadastroService = new CadastroService();
// Funções ativadas pelos botões do HTML. A funcionalidade dela é para chamar os métodos
function addCidadao() {
    _cadastroService.registrarCidadao();
}
function removerCidadao() {
    _cadastroService.removerCidadao();
}
function buscarCidadao() {
    var res = prompt("Qual voc\u00EA deseja buscar?\n".concat(_cadastroService.showLista(cidadao_array), "\nDigite o nome."));
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
    var res = prompt("Qual voc\u00EA deseja buscar?\n".concat(_cadastroService.showLista(funcionario_array), "\nDigite o nome."));
    alert(_cadastroService.buscarFuncionario(res));
}
// Adicionei logo de início um cidadão cadastrado caso queira verificar a lista sem cadastrar algum cidadão
var cidadao_array = [];
cidadao_array.push(new Cidadao("Carlos", 23, "8898-9807", "carlos@obrigado.com", "123.456.789-00"));
// Fiz o mesmo com um funcionário
var funcionario_array = [];
funcionario_array.push(new Funcionario("Matheus", 19, "Cadastrador", 2000));
