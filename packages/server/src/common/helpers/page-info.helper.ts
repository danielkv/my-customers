import { Pagination } from '../types/pagination';

/**
 * helps to return info from pagination and total items
 */
export class PageInfoHelper {
    get(itemsTotal: number, pagination: Pagination) {
        return {
            itemsTotal,
            ...pagination,
        };
    }
}
