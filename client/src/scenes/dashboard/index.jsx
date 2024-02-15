import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  Download,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "components/OverviewChart";
import { useGetBooksQuery } from "state/api";
import Statbox from "components/Statbox";

function Dashboard() {
  const theme = useTheme();
  const isNonMediaScreens = useMediaQuery("(min-width:1200px)");
  const { data, isLoading } = useGetBooksQuery();
  const getBooksRelevance = () => {
    if (!data || isLoading) return [];

    const relevanceSum = data.reduce((sum, item) => sum + item.relevance, 0);
    return relevanceSum;
  };
  const relevance = getBooksRelevance();

  const getBooksLikelihood = () => {
    if (!data || isLoading) return [];

    const likelihoodSum = data.reduce((sum, item) => sum + item.likelihood, 0);
    return likelihoodSum;
  };

  const likelihood = getBooksLikelihood();

  const getBookAddedYear = () => {
    if (!data || isLoading) return [];

    const addedYear = data[0].added;
    return addedYear;
  };

  const addedYear = [getBookAddedYear()];

  const getBookEndedYear = () => {
    if (!data || isLoading) return [];

    const endedYear = data[3].end_year;
    return endedYear;
  };

  const endedYear = [getBookEndedYear()];

  console.log(endedYear);

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
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome To Your Dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Books Data
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px "
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediaScreens ? undefined : "span 12" },
        }}
      >
        {/* Row 1 */}
        <Statbox
          title="Relevance Total"
          value={relevance}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Statbox
          title="Likelihood Total"
          value={likelihood}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2 "
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="relevance" />
        </Box>
        <Statbox
          title="Added"
          value={addedYear}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Statbox
          title="End Year"
          value={endedYear}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 12 "
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
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
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
