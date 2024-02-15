import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetBooksQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/CustomColumnMenu";

function Admin() {
  const theme = useTheme();
  const { data, isLoading } = useGetBooksQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.7,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 0.3,
    },
    {
      field: "start_year",
      headerName: "Start Year",
      flex: 0.3,
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      flex: 0.3,
    },
    {
      field: "relevance",
      headerName: "Relevance",
      flex: 0.3,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="List Of Admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          // components={{
          //   ColumnMenu: CustomColumnMenu,
          // }}
        />
      </Box>
    </Box>
  );
}

export default Admin;
