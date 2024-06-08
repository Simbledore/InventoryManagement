import { Alert, Box, Button, Card, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { BookingCreate } from "./BookingCreate";
import axios from "axios";
import { BookingArticleView, BookingView } from "./booking.models";
import { BookingTable } from "./BookingTable";


interface Props {
    book_in: boolean;
}

export function Booking(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [bookings, setBookings] = useState<BookingArticleView[] | null>(null);

    const getUrl = (): string => {
        return '/api/booking/' + (props.book_in ? 'bookin' : 'bookout') + '/overview';
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
            const response = await axios.get<BookingArticleView[]>(getUrl());
            setBookings(response.data);
        }

        getArticles()
            .catch(console.error);
    }, [open, props.book_in])

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                <Typography className='evo-green-text' variant="h2" sx={{fontSize: {xs: '25px', sm: '35px'}, mb: 2}}>{props.book_in ? 'Einbuchungsvorgänge' : 'Ausbuchungsvorgänge'}</Typography>
                <Button onClick={() => setOpen(true)}><AddIcon className='evo-green-text'/></Button>
            </Box>
            {bookings &&
                <BookingTable bookings={bookings}/>
            }
            {bookings && bookings.length === 0 &&
                <Alert severity="info" sx={{ mt: 2 }}>Es wurden noch keine {props.book_in ? 'Einbuchungen' : 'Ausbuchungen'} getätigt</Alert>
            }
            <BookingCreate book_in={props.book_in} open={open} setOpen={setOpen} />
        </Fragment>
    )
}