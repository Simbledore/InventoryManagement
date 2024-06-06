import { Box, Button } from "@mui/material";

interface Props {
    setOpen: (open: boolean) => void;
}

export function GenericModalButtons(props: Props) {
    return (
        <Box display='flex' justifyContent='space-between'>
            <Button variant="contained" className='evo-green-background' onClick={() => props.setOpen(false)}>Abbrechen</Button>
            <Button variant="contained" className='evo-green-background' type="submit">Speichern</Button>
        </Box>
    )
}