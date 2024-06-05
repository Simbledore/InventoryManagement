import { Box, Button, Card, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { ArticleView } from "../article/article_models";
import { BookingCreate } from "./BookingCreate";
import axios from "axios";
import { BookingView } from "./booking.models";


export function Bookings() {
    const [open, setOpen] = useState<boolean>(false);
    const [bookings, setBookings] = useState<BookingView[] | null>(null);

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
            const response = await axios.get<BookingView[]>('/api/booking/bookin/overview');
            setBookings(response.data);
        }

        // call the function
        getArticles()
            // make sure to catch any error
            .catch(console.error);
    }, [open])

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between'>
                <h1>Einbuchungsvorgänge</h1>
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
            <BookingCreate open={open} setOpen={setOpen} />
        </Fragment>
    )
}