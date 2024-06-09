import axios, { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm, ArticleView } from "./article_models";
import { Alert, Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import { BookingView } from "../bookings/booking.models";
import { ArticleBookingTable } from "./ArticleBookingTable";
import { GenericModalButtons } from "../generic/GenericModalButtons";
import { PaginationResult } from "../models/generic.models";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function ArticleEdit() {
    const hook = useForm<ArticleForm>({})
    const [article, setArticle] = useState<ArticleView | null>(null);
    const [bookings, setBookings] = useState<BookingView[] | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [next, setNext] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    let { id } = useParams();


    const submit = async (values: ArticleForm) => {
        try {
            await axios.post('/api/article/edit/' + id, values)
            setOpen(false);
            hook.reset();
        } catch (error) {
            const e = (error as AxiosError).response!.data;
            setError(e as string);
        }
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticle = async () => {
            const response = await axios.get<ArticleView>('/api/article/byId/' + id);
            setArticle(response.data);
        }

        const getBookings = async () => {
            const response = await axios.get<PaginationResult<BookingView[]>>('/api/booking/article/' + id + '?page=' + page);
            setBookings(response.data.data);
            setNext(response.data.next_page);
        }

        // call the function
        getArticle()
            // make sure to catch any error
            .catch(() => setLoadingError('Beim Laden des Artikels ist ein Fehler aufgetrten, bitte kontaktieren Sie einen Administrator'));

        getBookings()
            .catch(() => setLoadingError('Beim Laden der zugehörigen Buchungen ist ein Fehler aufgetrten, bitte kontaktieren Sie einen Administrator'));
    }, [open, page])

    return (
        <Fragment>
            {article &&
                <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                    <Typography className='evo-green-text' variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 2 }}>{article.name} - {article.amount} Stück</Typography>
                    <Button onClick={() => setOpen(true)}><EditIcon className='evo-green-text' /></Button>
                </Box>
            }
            {bookings &&
                <Fragment>
                    <ArticleBookingTable bookings={bookings} />
                    {bookings.length > 0 &&
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button disabled={page === 1} onClick={() => setPage(page - 1)} className='pagination-button'><ArrowBackIosIcon className='evo-green-text' /></Button>
                            <Box>{page}</Box>
                            <Button disabled={next === false} onClick={() => setPage(page + 1)} className='pagination-button'><ArrowForwardIosIcon className='evo-green-text' /></Button>
                        </Box>
                    }
                </Fragment>
            }
            {bookings && bookings.length === 0 &&
                <Alert severity="info" sx={{ mt: 2 }}>Für diesen Artikel wurden noch keine Buchungen durhcgeführt</Alert>
            }
            {loadingError &&
                <Alert severity="warning" sx={{ mt: 2 }}>{loadingError}</Alert>
            }
            <Modal open={open} onClose={() => setOpen(false)}>
                <Card sx={{ p: 2 }} className='modal-content'>
                    <Typography variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 1 }}>Artikel bearbeiten</Typography>
                    <form onSubmit={hook.handleSubmit(values => submit(values))}>
                        <TextField sx={{ mb: 2 }} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} label="Name" variant="outlined" {...hook.register('name')} fullWidth />
                        <GenericModalButtons setOpen={setOpen} />
                    </form>
                    {error &&
                        <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>
                    }
                </Card>
            </Modal>
        </Fragment>
    )
}