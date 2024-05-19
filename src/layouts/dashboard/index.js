import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistic } from "../../Redux/slices/userSlice";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, userStatistic } = useSelector((state) => state.user);
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const fetchData = useCallback(() => {
    dispatch(fetchStatistic());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  const gradientLineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jully",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "User",
        color: "info",
        data: userStatistic?.userMonthWiseCount.map((item) => item.count),
      },
      {
        label: "Creator",
        color: "dark",
        data: userStatistic?.creatorMonthWiseCount.map((item) => item.count),
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total users" }}
                count={userStatistic?.users?.length}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total creators" }}
                count={userStatistic?.creators?.length}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid> */}
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid> */}
            <Grid item xs={12} lg={12}>
              <GradientLineChart
                title="Users Overview"
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;
