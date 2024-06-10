import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BookingArticleView } from "./booking.models";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";


export interface Props {
    bookings: BookingArticleView[];
}

export function BookingTable(props: Props) {
    const navigate = useNavigate();

    return (
        <TableContainer sx={{ mb: 1 }} className='dark-table' component={Table}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '35%' }} className='dark-table-cell'>Artikel</TableCell>
                        <TableCell sx={{ width: '35%' }} className='dark-table-cell'>Menge</TableCell>
                        <TableCell sx={{ width: '35%' }} className='dark-table-cell'>Datum</TableCell>
                        <TableCell className='dark-table-cell'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.bookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell sx={{ wordWrap: 'break-word' }} className='dark-table-cell'>{booking.article.name}</TableCell>
                            <TableCell className='dark-table-cell'><p>{booking.amount}</p></TableCell>
                            <TableCell className='dark-table-cell'>
                                {new Date(booking.booking_date).toLocaleDateString()} <br />
                                {new Date(booking.booking_date).toLocaleTimeString()}
                            </TableCell>
                            <TableCell className='dark-table-cell'><Button onClick={() => navigate('/bookingview/' + booking.id)}><ArrowForwardIosIcon className='evo-green-text' /></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}