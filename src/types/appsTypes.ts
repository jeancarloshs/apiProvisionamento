export interface IResponse {
    success: boolean;
    found: number;
    data: IApps[];
    error?: string;
}

export interface IApps {
    id?: number;
    nomeApp: string;
    "cpf/cnpj": string;
    enderecoApp: string;
    telefoneApp: string;
    cidadeApp: string;
    cepApp: string;
    estadoApp?: number;
    created_at?: Date;
    updated_at?: Date;
    tbEstado?: ITbEstado;
}

export interface ITbEstado {
    estadosCompleto: string;
    estadosAbreviado: string;
}