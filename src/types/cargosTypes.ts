export interface IResponse {
    success: boolean;
    found: number;
    data: ICargos[] | string;
    error?: string;
}

export interface ICargos {
    id: number,
    cargoFuncionario: string,
    created_at: Date,
    updated_at: Date,
}