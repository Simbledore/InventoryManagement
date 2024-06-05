import { Box, Button, Card, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { ArticleView } from "../article/article_models";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BookingForm } from "./booking.models";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function BookingCreate(props: Props) {
    const hook = useForm<BookingForm>({})
    const [articles, setArticles] = useState<ArticleView[] | null>(null)

    const submit = async (values: BookingForm) => {
        try {
            await axios.post<BookingForm>('/api/booking/create', values);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
            console.log("getArticles")
            const response = await axios.get<ArticleView[]>('/api/article/overview');
            setArticles(response.data);
        }

        // call the function
        getArticles()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    return (
        <Fragment>
            {articles &&
                <Modal open={props.open} onClose={() => props.setOpen(false)}>
                    <Card className='modal-content'>
                        <Typography variant='h5' sx={{ mb: 1 }}>Einbuchung erstellen</Typography>
                        <form onSubmit={hook.handleSubmit(values => submit(values))}>
                            <InputLabel id="article-select">Artikel</InputLabel>
                            <Select defaultValue={''} labelId="article-select" sx={{ mb: 2 }} label='Artikel' {...hook.register('id')} fullWidth>
                                {articles.map(article => (
                                    <MenuItem key={article.id} value={article.id}>{article.name}</MenuItem>
                                ))}
                            </Select>
                            <TextField sx={{ mb: 2 }} label='Menge' variant='outlined' {...hook.register('amount')} fullWidth />
                            <Box display='flex' justifyContent='space-between'>
                                <Button variant="contained" onClick={() => props.setOpen(false)}>Abbrechen</Button>
                                <Button variant="contained" type="submit">Speichern</Button>
                            </Box>
                        </form>
                    </Card>
                </Modal>
            }
        </Fragment>

    )
}