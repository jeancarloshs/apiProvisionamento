export interface IResponse {
    success: boolean;
    found:   number;
    data:    IAuth[] | string;
    error?:   string;
}

export interface IAuth {
    user:  IUser;
    auth:  boolean;
    token: string;
}

export interface IUser {
    id:                     string;
    nomeFuncionario:        string;
    admin:                  boolean;
    permissaoDoColaborador: string;
    status:                 string;
}
