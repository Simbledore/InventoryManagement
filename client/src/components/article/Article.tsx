import { Fragment, useEffect, useState } from "react";
import { ArticleForm, ArticleView } from "./article_models";
import axios from "axios";
import { ArticleCard } from "./ArticleCard";
import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";

export function Article() {
    const hook = useForm<ArticleForm>({})
    const [articles, setArticles] = useState<ArticleView[] | null>(null);
    const [open, setOpen] = useState<boolean>(false);


    const submit = async (values: ArticleForm) => {
        try {
            const response = await axios.post<ArticleForm>('/api/article/create', values);
        } catch (error) {
            console.log(error);
        } finally {
            hook.reset();
            setOpen(false);
            console.log('response');
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
    }, [open])

    return (
        <Fragment>
            <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
                <Typography className='evo-green-text' variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 2 }}>Artikel</Typography>
                <Button onClick={() => setOpen(true)}><AddIcon className='evo-green-text' /></Button>
            </Box>
            {articles && articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
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
                </Card>
            </Modal>
        </Fragment>
    )
}