import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BookingView } from "./booking.models";

export interface Props {
    bookings: BookingView[];
}

export function BookingTable(props: Props) {

    return (
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
                    {props.bookings.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.article_name}</TableCell>
                            <TableCell>{book.amount}</TableCell>
                            <TableCell>{book.booking_date.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}