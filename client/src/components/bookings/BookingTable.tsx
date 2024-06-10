import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BookingArticleView,
  BookingForm,
  BookingGridView,
} from "./booking.models";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";

export interface Props {
  bookings: BookingArticleView[];
  book_in: boolean;
}

export function BookingTable(props: Props) {
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
    } catch (error) {}
    console.log(values);
  };

  let rows: BookingGridView[] = props.bookings.map((booking) => ({
    id: booking.id,
    amount: booking.amount,
    booking_number: booking.booking_number,
    charge: booking.charge,
    article_name: booking.article.name,
    booking_date: new Date(booking.booking_date).toLocaleString(),
    article_id: booking.article.id,
  }));

  const columns: GridColDef<BookingGridView>[] = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      flex: 0.5,
      filterable: false,
      minWidth: 90,
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
      width: 100,
      headerClassName: "super-app-theme--header",
      resizable: false,
      getActions: (params) => [
        <Button onClick={async () => await submit(params)}>
          <SaveIcon sx={{ color: "#329999" }} />
        </Button>,
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={{
          color: "white",
          "& .super-app-theme--header": {
            backgroundColor: "#329999",
          },
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
