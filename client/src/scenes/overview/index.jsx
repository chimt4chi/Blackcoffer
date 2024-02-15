import React, { useState } from "react";
import { FormControl, InputLabel, Box, Select, MenuItem } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

function Overview() {
  const [view, setView] = useState("relevance");
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of Gerneal Revenue and Profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="relevance">Relevance</MenuItem>
            <MenuItem value="likelihood">Likelihood</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
