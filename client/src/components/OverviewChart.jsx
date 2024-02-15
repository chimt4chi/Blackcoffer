import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetBooksQuery } from "state/api";

function OverviewChart({ isDashboard = false, view }) {
  const theme = useTheme();
  const { data, isLoading } = useGetBooksQuery();

  const getBooksRelevance = () => {
    if (!data || isLoading) return [];

    const relevance = data.map((item) => item.relevance);
    return relevance;
  };

  const getBooksLikelihood = () => {
    if (!data || isLoading) return [];

    const likelihood = data.map((item) => item.likelihood);
    return likelihood;
  };

  const relevance = getBooksRelevance();
  const likelihood = getBooksLikelihood();

  const relevanceData = {
    id: "Relevance",
    color: theme.palette.secondary.main,
    data: relevance.map((value, index) => ({ x: index, y: value })),
  };

  const likelihoodData = {
    id: "Likelihood",
    color: theme.palette.secondary[600],
    data: likelihood.map((value, index) => ({ x: index, y: value })),
  };

  const likelihoodDataArr = [likelihoodData];
  const relevanceDataArr = [relevanceData];

  return (
    <>
      {data === undefined ? (
        <>Loading...</>
      ) : (
        <ResponsiveLine
          data={view === "relevance" ? relevanceDataArr : likelihoodDataArr}
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
          margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              if (isDashboard) return v.slice(0, 3);
              return v;
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard
              ? ""
              : `Total ${
                  view === "likelihood" ? "Likelihood Data" : "Relevance Data"
                }`,
            legendOffset: -60,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : undefined
          }
        />
      )}
    </>
  );
}

export default OverviewChart;
