import { Alert, Box, Button, Card, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { BookingCreate } from "./BookingCreate";
import axios from "axios";
import { BookingView } from "./booking.models";


interface Props {
    book_in: boolean;
}

export function Booking(props: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [bookings, setBookings] = useState<BookingView[] | null>(null);

    const getUrl = (): string => {
        return '/api/booking/' + (props.book_in ? 'bookin' : 'bookout') + '/overview';
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
            const response = await axios.get<BookingView[]>(getUrl());
            setBookings(response.data);
        }

        // call the function
        getArticles()
            // make sure to catch any error
            .catch(console.error);
    }, [open, props.book_in])

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between'>
                <h1>{props.book_in ? 'Einbuchungsvorgänge' : 'Ausbuchungsvorgänge'}</h1>
                <Button onClick={() => setOpen(true)}><AddIcon /></Button>
            </Box>
            {bookings &&
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Artikel</TableCell>
                                <TableCell>Menge</TableCell>
                                <TableCell>Datum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map(book => (
                                <TableRow key={book.id}>
                                    <TableCell>{book.article_name}</TableCell>
                                    <TableCell>{book.amount}</TableCell>
                                    <TableCell>{book.booking_date.toString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {bookings && bookings.length === 0 &&
                <Alert severity="info" sx={{ mt: 2 }}>Es wurden noch keine {props.book_in ? 'Einbuchungen' : 'Ausbuchungen'} getätigt</Alert>
            }
            <BookingCreate book_in={props.book_in} open={open} setOpen={setOpen} />
        </Fragment>
    )
}