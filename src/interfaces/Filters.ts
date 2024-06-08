export interface Filters {
    language?: string;
    region?: string;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    budget?: number;
    minRating?: number;
    page?: number;
}