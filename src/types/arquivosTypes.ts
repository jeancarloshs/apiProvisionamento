export interface IResponse {
    success: boolean;
    found:   number;
    data:    IArquivos[] | string;
    error?:   string;
}

export interface IArquivos {
    id?:         number;
    nome:       string;
    url:        string;
    app:        number;
    created_at?: Date;
    updated_at?: Date;
}
