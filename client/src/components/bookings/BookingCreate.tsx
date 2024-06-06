import { Alert, Box, Button, Card, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { ArticleView } from "../article/article_models";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BookingForm } from "./booking.models";
import { GenericModalButtons } from "../generic/GenericModalButtons";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    book_in: boolean;
}

export function BookingCreate(props: Props) {
    const hook = useForm<BookingForm>({ defaultValues: { book_in: props.book_in ? true : false } });
    const [articles, setArticles] = useState<ArticleView[] | null>(null)
    const [error, setError] = useState<string | null>(null);

    const getUrl = (): string => {
        return '/api/booking/' + (props.book_in ? 'bookin' : 'bookout') + '/create';
    }

    const submit = async (values: BookingForm) => {
        try {
            const response = await axios.post(getUrl(), values);
            props.setOpen(false);
            hook.reset();
            setError(null);
        } catch (error) {
            setError('Die angegebene Menge ist zu hoch')
        }
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
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
                    <Card sx={{p: 2}} className='modal-content'>
                        <Typography variant="h2" sx={{fontSize: {xs: '25px', sm: '35px'}, mb: 1}}>{props.book_in ? 'Einbuchung erstellen' : 'Ausbuchung erstellen'}</Typography>
                        <form onSubmit={hook.handleSubmit(values => submit(values))}>
                            <InputLabel style={{color: 'white'}} id="article-select">Artikel</InputLabel>
                            <Select inputProps={{className: 'custom-input'}} defaultValue={''} labelId="article-select" sx={{ mb: 2 }} label='Artikel' {...hook.register('id')} fullWidth>
                                {articles.map(article => (
                                    <MenuItem key={article.id} value={article.id}>{article.name}</MenuItem>
                                ))}
                            </Select>
                            <TextField InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} sx={{ mb: 2 }} label='Menge' variant='outlined' {...hook.register('amount')} fullWidth />
                            <GenericModalButtons setOpen={props.setOpen}/>
                        </form>
                        {error &&
                            <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>
                        }
                    </Card>
                </Modal>
            }
        </Fragment>

    )
}