import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { BookingArticleView, BookingForm, BookingView } from "./booking.models";
import { useForm } from "react-hook-form";

export function BookingEdit() {
    const hook = useForm<BookingForm>({});
    const [booking, setBooking] = useState<BookingArticleView | null>(null);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    let { id } = useParams();

    const submit = async (values: BookingForm) => {
        try {
            await axios.post('/api/booking/edit/' + id + '/' + booking?.article.id, values)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getBooking = async () => {
            const response = await axios.get<BookingArticleView>('/api/booking/' + id);
            setBooking(response.data);
        };

        getBooking()
            .catch(() => setLoadingError('Beim Laden der zugehörigen Buchungen ist ein Fehler aufgetrten, bitte kontaktieren Sie einen Administrator'));
    }, [])

    return (
        <Fragment>
            {booking &&
                <Fragment>
                    <Typography className='evo-green-text' variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 2 }}>Buchung: {booking.booking_number}</Typography>
                    <Box sx={{ boxShadow: 4, mb: { xs: 1, sm: 2 }, p: 2, backgroundColor: '#393939', borderRadius: '10px' }}>
                        <form onSubmit={hook.handleSubmit(values => submit(values))}>
                            <TextField defaultValue={booking.article.name} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} sx={{ mb: 2 }} label='Name' variant='outlined' disabled fullWidth />
                            {booking.book_in &&
                                <TextField defaultValue={booking.charge} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} sx={{ mb: 2 }} label='Charge' variant='outlined' {...hook.register('charge')} fullWidth disabled={!booking.book_in} />
                            }
                            <TextField defaultValue={booking.amount} InputProps={{ className: 'custom-input', type: 'number' }} InputLabelProps={{ className: 'custom-input-label' }} sx={{ mb: 2 }} label='Menge' variant='outlined' {...hook.register('amount')} fullWidth disabled={!booking.book_in} />
                            <TextField defaultValue={new Date(booking.booking_date).toLocaleString()} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} sx={{ mb: 2 }} label='Menge' variant='outlined' disabled fullWidth />
                            <Button variant="contained" className='evo-green-background' type="submit">Speichern</Button>
                        </form>
                    </Box>
                </Fragment>
            }

        </Fragment>
    )
}