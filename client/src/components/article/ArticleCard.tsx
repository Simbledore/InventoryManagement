import { Box, Button, Typography } from "@mui/material";
import { ArticleView } from "./article.models";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  article: ArticleView;
  deleteRefresh: boolean;
  setDeleteRefresh: (value: boolean) => void;
  setError: (value: string) => void;
}

export function ArticleCard(props: Props) {
  const navigate = useNavigate();

  const deleteArticle = async () => {
    try {
      await axios.delete("/api/article/" + props.article.id);
      props.setDeleteRefresh(!props.deleteRefresh);
    } catch (error) {
      const e = (error as AxiosError).response!.data;
      props.setError(e as string);
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 4,
        height: { xs: "60px", sm: "80px" },
        mb: { xs: 1, sm: 2 },
        p: 2,
        backgroundColor: "#393939",
        borderRadius: "10px",
      }}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "1rem", sm: "20px" }, mb: 1 }}
        >
          {props.article.name}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.875rem", sm: "0.975rem" } }}>
          Menge: <strong>{props.article.amount} St.</strong>
        </Typography>
      </Box>
      <Box>
        <Button onClick={deleteArticle}>
          <DeleteIcon className="evo-green-text" />
        </Button>
        <Button onClick={() => navigate("/article/edit/" + props.article.id)}>
          <ArrowForwardIosIcon className="evo-green-text" />
        </Button>
      </Box>
    </Box>
  );
}
