export interface Response {
    success: boolean;
    found:   number;
    data:    Apps[];
    error:   string;
}

export interface Apps {
    id:          number;
    nomeApp:     string;
    "cpf/cnpj":  string;
    enderecoApp: string;
    telefoneApp: string;
    cidadeApp:   string;
    cepApp:      string;
    estadoApp:   number;
    created_at:  Date;
    updated_at:  Date;
    tbEstado:    TBEstado;
}

export interface TBEstado {
    estadosCompleto:  string;
    estadosAbreviado: string;
}