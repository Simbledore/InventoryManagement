export interface PaginationResult<T> {
    data: T;
    next_page: boolean;
}

export interface ServerResult<T> {
    data: T | null;
    error: string | null;
}