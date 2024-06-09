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