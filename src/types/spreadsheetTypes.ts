export interface IResponse {
    success: boolean;
    found: number;
    data: ISpreadsheet[] | string;
    error?: string;
}

export interface ISpreadsheet {

}