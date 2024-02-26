import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = () => {
  const [data, setData] = useState(null);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders/order-by-category");
        const result = await response.json();
       
        setData(result.data);
        console.log("🚀 ~ fetchData ~ result.data:", result.data)
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
        id: item.category_name.toLowerCase(),
        label: item.category_name,
        value: item.order_count,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, // Generate random color
      }));
      setTransformedData(transformed);
    }
  }, [data]); // Re-run whenever 'data' changes

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {transformedData && (
        <div>
          <ResponsivePie
            data={transformedData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            sortByValue={true}
            innerRadius={0.45}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "category10" }}
            borderColor={{ theme: "background" }}
            arcLinkLabelsSkipAngle={7}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ theme: "background" }}
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
        </div>
      )}
    </div>
  );
};
export default PieChart;
