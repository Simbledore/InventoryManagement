import { Modal, Card, Typography, TextField, Box, Button } from "@mui/material";
import { ArticleView, ArticleSearchModel } from "./article_models";
import { useForm } from "react-hook-form";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    setArticles: (articles: ArticleView[]) => void;
    setNext: (next: boolean) => void;
    setError: (error: string) => void;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    page: number;
}
 
export function ArticleSearch(props: Props){
    const hook = useForm<ArticleSearchModel>({});

    const submit = async (values: ArticleSearchModel) => {
        try {
            props.setSearch(values.q);
            props.setOpen(false);
            props.setPage(1);
        } catch (error) {
            props.setError('Beim Suchen der Artikel ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator');
        }
    }

    const cancle = () => {
        hook.reset();
        props.setOpen(false);
    }

    return (
        <Modal open={props.open} onClose={() => props.setOpen(false)}>
            <Card sx={{ p: 2 }} className="modal-content">
                <Typography variant="h2" sx={{ fontSize: { xs: '25px', sm: '35px' }, mb: 1 }}>Artikel suchen</Typography>
                <form onSubmit={hook.handleSubmit(values => submit(values))}>
                    <TextField sx={{ mb: 2 }} InputProps={{ className: 'custom-input' }} InputLabelProps={{ className: 'custom-input-label' }} label="Name" variant="outlined" {...hook.register('q')} fullWidth />
                    <Box display='flex' justifyContent='space-between'>
                        <Button variant="contained" className='evo-green-background' onClick={cancle}>Abbrechen</Button>
                        <Button variant="contained" type="submit" className='evo-green-background'>Suchen</Button>
                    </Box>
                </form>
            </Card>
        </Modal>
    )
}