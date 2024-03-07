import React, { useState, useEffect } from "react";
import { ResponsiveBar  } from "@nivo/bar";
import { Box } from "@mui/material";
import Header from "../Header";


const BarChart = () => {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/orders/top-buyer"
        );
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Transform the data
      const transformed = data.map((item) => ({
        buyer_id: item.buyer_username.toString(),
        total_spending: parseFloat(item.total_spending).toFixed(2),
        total_spendingColor: `hsl(191, 70%, 50%)`,
      }));
  
      setTransformedData(transformed);
    }
  }, [data]);
  

  const fill = [
    {
      match: {
        id: "accessories",
      },
      id: "dots",
    },
    {
      match: {
        id: "clothing",
      },
      id: "lines",
    },
    {
      match: {
        id: "shoes",
      },
      id: "dots",
    }
    ];

  return (
    <div>
      <Box m="20px"  >
        <Header title="Customer Lifetime Spending" subtitle="Reporting customer spending and  number of orders" />
        <Box height="40vh">
        <ResponsiveBar
        data={transformedData}
        keys={[
            'total_spending',
            
        ]}
        groupMode="grouped"
        indexBy="buyer_id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Money Spend $',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
        </Box>
      </Box>
    </div>
  );
};
export default BarChart;
