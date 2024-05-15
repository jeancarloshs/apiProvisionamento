export interface ICustomRequest extends Request {
    authorization?: string,
    userId?: number;
}