export interface IResponse {
    success: boolean;
    found:   number;
    data:    IUsers[] | string;
    error?:   string;
}

export interface IUsers {
    id:                     string;
    nomeFuncionario:        string;
    cargoFuncionario:       string;
    emailFuncionario:       string;
    senhaFuncionario:       string;
    admin:                  boolean;
    permissaoDoColaborador: string;
    status:                 string;
    app:                    string;
    created_at:             string;
    updated_at:             string;
}
