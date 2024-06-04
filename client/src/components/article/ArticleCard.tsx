import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { ArticleView } from "./article_models";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    article: ArticleView;
}


export function ArticleCard(props: Props) {

    return (
        <Card sx={{ boxShadow: 4}} style={{marginBottom: '1%', backgroundColor: 'white'}}>
            <CardContent>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Box>
                        <Typography variant="h6">{props.article.name}</Typography>
                        <div>Menge: <strong>{props.article.amount}</strong></div>
                    </Box>
                    <Button><ArrowForwardIosIcon/></Button>
                </Box>
                
            </CardContent>
        </Card>
    )
}