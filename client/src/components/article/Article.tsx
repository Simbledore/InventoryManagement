import { Fragment, useEffect, useState } from "react";
import { ArticleForm, ArticleView } from "./article_models";
import axios, { AxiosError } from "axios";
import { ArticleCard } from "./ArticleCard";
import { Alert, Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PaginationResult } from "../models/generic.models";


export function Article() {
    const hook = useForm<ArticleForm>({})
    const [articles, setArticles] = useState<ArticleView[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [next, setNext] = useState<boolean>(false);


    const submit = async (values: ArticleForm) => {
        try {
            await axios.post('/api/article/create', values);
            hook.reset();
            setOpen(false);
            setError(null);
        } catch (error) {
            const e = (error as AxiosError).response!.data;
            setError(e as string);
        }
    }

    useEffect(() => {
        // declare the data fetching function
        const getArticles = async () => {
            const response = await axios.get<PaginationResult<ArticleView[]>>('/api/article/overview?page=' + page);
            setArticles(response.data.data);
            setNext(response.data.next_page)
        }

        // call the function
        getArticles()
            // make sure to catch any error
            .catch(() => setError('Beim laden der Artikel ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator!'));
    }, [open, page])

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                <Typography className='evo-green-text' variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 2 }}>Artikel</Typography>
                <Button onClick={() => setOpen(true)}><AddIcon className='evo-green-text' /></Button>
            </Box>
            {articles && articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)} className='pagination-button'><ArrowBackIosIcon className='evo-green-text' /></Button>
                <Box>{page}</Box>
                <Button disabled={next === false} onClick={() => setPage(page + 1)} className='pagination-button'><ArrowForwardIosIcon className='evo-green-text' /></Button>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Card sx={{ p: 2 }} className="modal-content">
                    <Typography variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 1 }}>Artikel hinzufügen</Typography>
                    <form onSubmit={hook.handleSubmit(values => submit(values))}>
                        <TextField sx={{ mb: 2 }} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} label="Name" variant="outlined" {...hook.register('name')} fullWidth />
                        <Box display='flex' justifyContent='space-between'>
                            <Button variant="contained" className='evo-green-background' onClick={() => setOpen(false)}>Abbrechen</Button>
                            <Button variant="contained" type="submit" className='evo-green-background'>Speichern</Button>
                        </Box>
                    </form>
                    {error &&
                        <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>
                    }
                </Card>
            </Modal>
        </Fragment>
    )
}