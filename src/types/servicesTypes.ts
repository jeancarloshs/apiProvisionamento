export interface IResponse {
    success: boolean;
    found:   number;
    data:    IServices[] | string;
    error?:   string;
}

export interface IServices {
    id:            number;
    tipoDeServico: string;
    app:           number;
    created_at:    Date;
    updated_at:    Date;
}
