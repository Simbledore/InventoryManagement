import { ArticleView } from "../article/article_models";

export interface BookingForm {
    id: number;
    amount: number;
    book_in: boolean;
    charge: string;
}

export interface BookingView extends BookingForm {
    article_name: string;
    booking_date: Date;
    booking_number: number;
}

export interface BookingArticleView extends BookingView {
    article: ArticleView;
}

export interface BookingGridView {
    id: number;
    amount: number;
    charge: string;
    booking_number: number;
    article_name: string;
    booking_date: string;
    article_id: number;
}