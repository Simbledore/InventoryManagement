import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { BookingView } from "../bookings/booking.models";

export interface Props {
    bookings: BookingView[];
}

export function ArticleBookingTable(props: Props) {

    return (
        <TableContainer className='dark-table' component={Table}>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell className='dark-table-cell'>Buchungsart</TableCell>
                        <TableCell className='dark-table-cell'>Menge</TableCell>
                        <TableCell className='dark-table-cell'>Datum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.bookings.map(book => (
                        <TableRow key={book.id}>
                            <TableCell className='dark-table-cell'>{book.book_in ? 'Einbuchung' : 'Ausbuchung'}</TableCell>
                            <TableCell className='dark-table-cell'>{book.amount}</TableCell>
                            <TableCell className='dark-table-cell'>                                
                                {new Date(book.booking_date).toLocaleDateString()} <br />
                                {new Date(book.booking_date).toLocaleTimeString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}