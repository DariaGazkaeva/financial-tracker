export interface IApiResponse<T> {
    data: T | null;
    error: string | null;
}
