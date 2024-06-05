import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BookingView } from "../bookings/booking.models";

export interface Props {
    bookings: BookingView[];
}

export function ArticleBookingTable(props: Props){

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Menge</TableCell>
                        <TableCell>Datum</TableCell>
                        <TableCell>Buchungsart</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.bookings.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.amount}</TableCell>
                            <TableCell>{book.booking_date.toString()}</TableCell>
                            <TableCell>{book.book_in ? 'Einbuchung' : 'Ausbuchung'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}