export interface BookingForm {
    id: number;
    amount: number;
}

export interface BookingView extends BookingForm {
    article_name: string;
    booking_date: Date;
}