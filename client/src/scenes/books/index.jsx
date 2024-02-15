import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetBooksQuery } from "state/api";
import Header from "components/Header";

const Book = ({
  _id,
  topic,
  title,
  region,
  country,
  added,
  likelihood,
  relevance,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Topic: {topic}
        </Typography>
        <Typography variant="h5" component="div">
          Relevance: {relevance}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Country: {country}
        </Typography>
        <Rating value={likelihood} readOnly />
        <Typography display="block" variant="body">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "View Details"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Region: {region}</Typography>
          <Typography>Added: {added}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

function Books() {
  const { data, isLoading } = useGetBooksQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  // console.log("🚀 ~ Products ~ data:", data);
  return (
    <Box m="1.5rem 2.5rem ">
      <Header
        title={"Products"}
        subtitle={"Explore our products and reviews."}
      />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div ": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map(
            ({
              _id,
              topic,
              title,
              region,
              country,
              added,
              intersity,
              likelihood,
              relevance,
            }) => (
              <Book
                key={_id}
                _id={_id}
                topic={topic}
                title={title}
                region={region}
                country={country}
                added={added}
                intersity={intersity}
                likelihood={likelihood}
                relevance={relevance}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Books;
