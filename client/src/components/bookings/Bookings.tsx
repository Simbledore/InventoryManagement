import { Box, Button, Card, Modal, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { ArticleView } from "../article/article_models";
import { BookingCreate } from "./BookingCreate";


export function Bookings(){
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between'>
                <h1>Buchungen</h1>
                <Button onClick={() => setOpen(true)}><AddIcon /></Button>
            </Box>
            <BookingCreate open={open} setOpen={setOpen}/>
        </Fragment>
    )
}