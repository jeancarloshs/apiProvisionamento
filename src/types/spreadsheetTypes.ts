export interface IResponse {
    success: boolean;
    found: number;
    data: ISpreadsheet[] | string;
    error?: string;
}

export interface ISpreadsheet {
    id: number,
    nomePlanilha: string,
    urlPlanilha: string,
    planilhaSelecionada: boolean,
    app: number,
    created_at: Date,
    updated_at: Date
}