import { Pagination } from '../types/pagination';

interface IExtractedPagination {
    start: number;
    end?: number;
}

/**
 * Helper to extract pagination.
 * Returns the start and the end of the pointer
 */
export class ExtractPaginationHelper {
    execute(pagination?: Pagination): IExtractedPagination {
        if (!pagination) return { start: 0, end: undefined };

        const start = pagination?.offset ? pagination.offset : 0;
        const end =
            pagination?.offset !== undefined && pagination?.limit ? pagination.offset + pagination.limit : undefined;

        return { start, end };
    }
}
