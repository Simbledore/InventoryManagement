import { Alert, Box, Button, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { BookingCreate } from "./BookingCreate";
import axios from "axios";
import { BookingArticleView } from "./booking.models";
import { BookingTable } from "./BookingTable";
import { PaginationResult } from "../models/generic.models";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface Props {
  book_in: boolean;
}

export function Booking(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingArticleView[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const getUrl = (): string => {
      return "/api/booking/overview?bookin=" + (props.book_in ? true : false);
    };
    // declare the data fetching function
    const getBookings = async () => {
      const response = await axios.get<BookingArticleView[]>(getUrl());
      setBookings(response.data);
    };

    getBookings().catch(() =>
      setLoadingError(
        "Beim Laden der Buchungen ist ein Fehler aufgetreten, bitte kontaktieren Sie einen Administrator"
      )
    );
  }, [open, props.book_in, page]);

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          className="evo-green-text"
          variant="h2"
          sx={{ fontSize: { xs: "25px", sm: "35px" }, mb: 2 }}
        >
          {props.book_in ? "Einbuchungsvorgänge" : "Ausbuchungsvorgänge"}
        </Typography>
        <Button onClick={() => setOpen(true)}>
          <AddIcon className="evo-green-text" />
        </Button>
      </Box>
      {bookings && bookings.length > 0 && (
        <BookingTable bookings={bookings} book_in={props.book_in} />
      )}
      {bookings && bookings.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Es wurden noch keine {props.book_in ? "Einbuchungen" : "Ausbuchungen"}{" "}
          getätigt
        </Alert>
      )}
      {loadingError && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {loadingError}
        </Alert>
      )}
      <BookingCreate book_in={props.book_in} open={open} setOpen={setOpen} />
    </Fragment>
  );
}
