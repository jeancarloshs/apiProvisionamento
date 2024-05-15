export interface IResponse {
    success: boolean;
    found:   number;
    data:    IProvisionamento[] | string;
    error?:   string;
}

export interface IProvisionamento {
    id:              number;
    nomeCliente:     string;
    enderecoCliente: string;
    numeroDeSerie:   string;
    posicionamento:  string;
    patrimonioNaxos: number;
    created_at:      Date;
    updated_at:      Date;
    tbUsuario:       ITbUsuario;
    tbTipoDeServico: ITbTipoDeServico;
    tbApp:           ITbApp;
}

export interface ITbApp {
    nomeApp: string;
}

export interface ITbTipoDeServico {
    tipoDeServico: string;
}

export interface ITbUsuario {
    nomeFuncionario: string;
}
