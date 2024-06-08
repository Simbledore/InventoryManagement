import { ArticleView } from "../article/article_models";

export interface BookingForm {
    id: number;
    amount: number;
    book_in: boolean;
}

export interface BookingView extends BookingForm {
    article_name: string;
    booking_date: Date;
}

export interface BookingArticleView extends BookingView {
    article: ArticleView;
}