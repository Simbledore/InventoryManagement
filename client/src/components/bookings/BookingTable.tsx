import { Alert, Box, Button } from "@mui/material";
import { BookingArticleView, BookingGridView } from "./booking.models";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Props {
  bookings: BookingArticleView[];
  book_in: boolean;
}

export function BookingTable(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<BookingGridView[] | null>(null);

  const submit = async (values: GridRowParams<BookingGridView>) => {
    try {
      await axios.post(
        "/api/booking/edit/" + values.row.id + "/" + values.row.article_id,
        {
          amount: values.row.amount,
          charge: values.row.charge,
          book_in: props.book_in,
        }
      );
    } catch (error) {
      const e = (error as AxiosError).response!.data;
      setError(e as string);
    }
  };

  const deleteBooking = async (values: GridRowParams<BookingGridView>) => {
    try {
      await axios.post(
        "/api/booking/delete/" + values.row.id + "/" + values.row.article_id,
        {
          amount: values.row.amount,
          book_in: props.book_in,
        }
      );
      setRows(rows!.filter((row: BookingGridView) => row.id !== values.row.id));
    } catch (error) {
      const e = (error as AxiosError).response!.data;
      setError(e as string);
    }
  };

  useEffect(() => {
    const getRows = async () => {
      const rows: BookingGridView[] = props.bookings.map((booking) => ({
        id: booking.id,
        amount: booking.amount,
        booking_number: booking.booking_number,
        charge: booking.charge,
        article_name: booking.article.name,
        booking_date: new Date(booking.booking_date).toLocaleString(),
        article_id: booking.article.id,
      }));
      setRows(rows);
    };

    getRows();
  }, []);

  const columns: GridColDef<BookingGridView>[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "booking_number",
      headerName: "BNr",
      headerClassName: "super-app-theme--header",
      flex: 0.3,
      filterable: false,
      minWidth: 80,
      resizable: false,
    },
    {
      field: "article_name",
      headerName: "Artikel",
      headerClassName: "super-app-theme--header",
      width: 200,
      flex: 0.5,
      filterable: false,
      editable: false,
      minWidth: 170,
      resizable: false,
    },
    {
      field: "amount",
      headerName: "Menge",
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 0.5,
      filterable: false,
      minWidth: 170,
      resizable: false,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "charge",
      headerName: "Charge",
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 0.5,
      filterable: false,
      minWidth: 170,
      resizable: false,
    },
    {
      field: "booking_date",
      headerName: "Datum",
      editable: true,
      headerClassName: "super-app-theme--header",
      flex: 0.5,
      filterable: false,
      minWidth: 170,
      resizable: false,
    },
    {
      field: "actions",
      type: "actions",
      width: 120,
      headerClassName: "super-app-theme--header",
      resizable: false,
      getActions: (params) => [
        <Button sx={{ ml: 1 }} onClick={async () => await submit(params)}>
          <SaveIcon sx={{ color: "#329999" }} />
        </Button>,
        <Button
          sx={{ mr: 2 }}
          onClick={async () => await deleteBooking(params)}
        >
          <DeleteIcon sx={{ color: "#329999" }} />
        </Button>,
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {rows && (
        <DataGrid
          sx={{
            color: "white",
            "& .super-app-theme--header": {
              backgroundColor: "#329999",
            },
          }}
          autoHeight
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                charge: props.book_in,
                id: false,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      )}
      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
