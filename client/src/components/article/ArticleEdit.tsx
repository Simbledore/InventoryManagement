import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleForm, ArticleView } from "./article_models";
import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import { BookingView } from "../bookings/booking.models";
import { ArticleBookingTable } from "./ArticleBookingTable";

export function ArticleEdit() {
    const hook = useForm<ArticleForm>({})
    const [article, setArticle] = useState<ArticleView | null>(null);
    const [bookings, setBookings] = useState<BookingView[] | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    let { id } = useParams();


    const submit = async (values: ArticleForm) => {
        try {
            await axios.post('/api/article/edit/' + id, values)
            setOpen(false);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticle = async () => {
            const response = await axios.get<ArticleView[]>('/api/article/byId/' + id);
            setArticle(response.data[0]);
        }

        const getBookings = async () => {
            const response = await axios.get<BookingView[]>('/api/booking/article/' + id);
            setBookings(response.data);
        }

        // call the function
        getArticle()
            // make sure to catch any error
            .catch(console.error);

        getBookings()
           .catch(console.error);
    }, [open])

    return (
        <Fragment>
            {article &&
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant="h4">{article.name} - Aktuelle Menge: {article.amount}</Typography>
                    <Button onClick={() => setOpen(true)}><EditIcon /></Button>
                </Box>
            }
            {bookings && 
                <ArticleBookingTable bookings={bookings}/>
            }
            <Modal open={open} onClose={() => setOpen(false)}>
                <Card className='modal-content'>
                    <form onSubmit={hook.handleSubmit(values => submit(values))}>
                        <TextField sx={{ mb: 2 }} label="Name" variant="outlined" {...hook.register('name')} fullWidth />
                        <Box display='flex' justifyContent='space-between'>
                            <Button variant="contained" onClick={() => setOpen(false)}>Abbrechen</Button>
                            <Button variant="contained" type="submit">Speichern</Button>
                        </Box>
                    </form>
                </Card>
            </Modal>
        </Fragment>
    )
}