import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetBooksQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";

function Geography() {
  const isoCountries = require("i18n-iso-countries");

  // Load English language data for country names
  isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  // Function to convert country name to alpha-3 code
  function convertToAlpha3(countryName) {
    try {
      const alpha3Code = isoCountries.getAlpha3Code(countryName, "en");
      return alpha3Code || "Not Found";
    } catch (error) {
      console.error("Error converting country name to alpha-3 code:", error);
      return "Error";
    }
  }

  const { data, isLoading } = useGetBooksQuery();

  const getCountry = () => {
    if (isLoading || !data) {
      return [];
    }

    const convertedCountryCodes = data.map((item) => {
      const country = item.country;
      const convertedCountryCode = convertToAlpha3(country);
      // console.log(`Converted ${country}: ${convertedCountryCode}`);
      return {
        id: convertedCountryCode,
        value: item.likelihood,
      };
    });

    return convertedCountryCodes;
  };

  const convertedCountries = getCountry();
  console.log("Converted Countries:", convertedCountries);

  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find Where Books are purchased." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={convertedCountries}
            features={geoData.features}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 0, right: 50, bottom: 0, left: -50 }}
            domain={[0, 5]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[-10, 0, 0]}
            enableGraticule={false}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Geography;
