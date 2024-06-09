import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BookingArticleView } from "./booking.models";

export interface Props {
    bookings: BookingArticleView[];
}

export function BookingTable(props: Props) {

    return (
        <TableContainer sx={{ mb: 1 }} className='dark-table' component={Table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='dark-table-cell'>Artikel</TableCell>
                        <TableCell className='dark-table-cell'>Menge</TableCell>
                        <TableCell className='dark-table-cell'>Datum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.bookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell sx={{wordWrap: 'break-word'}} className='dark-table-cell'>{booking.article.name}</TableCell>
                            <TableCell className='dark-table-cell'><p>{booking.amount}</p></TableCell>
                            <TableCell className='dark-table-cell'>
                                {new Date(booking.booking_date).toLocaleDateString()} <br />
                                {new Date(booking.booking_date).toLocaleTimeString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}