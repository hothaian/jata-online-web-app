import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";
import Header from "../Header";

const OrderCategoryChart = () => {
  const [data, setData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/orders/category"
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
      // Transform the data to percentage
      const totalOrders = data.reduce(
        (total, item) => total + item.order_count,
        0
      );
      const transformed = data.map((item) => ({
        id: item.category_name.toLowerCase(),
        label: item.category_name,
        value: Math.round((item.order_count / totalOrders) * 100),
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, // Generate random color
      }));
    

      setTransformedData(transformed);
    }
  }, [data]); // Re-run whenever 'data' changes

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
    },
  ];

  return (
    <div>
      <Box m="20px">
        <Header
          title="Order By Category"
          subtitle="Give Order Category among Orders"
        />
        <Box height="40vh">
          <ResponsivePie
            data={transformedData}
            arcLabel={(item) => `${item.value}%`}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={fill}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    </div>
  );
};
export default OrderCategoryChart;
