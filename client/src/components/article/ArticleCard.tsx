import { Box, Button, Typography } from "@mui/material";
import { ArticleView } from "./article_models";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

interface Props {
    article: ArticleView;
}


export function ArticleCard(props: Props) {
    const navigate = useNavigate();

    return (
        <Box sx={{ boxShadow: 4, height: { xs: '60px', sm: '80px' }, mb: { xs: 1, sm: 2 }, p: 2, backgroundColor: '#393939', borderRadius: '10px' }}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'>
            <Box>
                <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '20px' }, mb: 1 }}>{props.article.name}</Typography>
                <Typography sx={{ fontSize: { xs: '0.875rem', sm: '0.975rem' } }}>Menge: <strong>{props.article.amount} St.</strong></Typography>
            </Box>
            <Button onClick={() => navigate('/article/edit/' + props.article.id)}><ArrowForwardIosIcon className='evo-green-text' /></Button>
        </Box>
    )
}