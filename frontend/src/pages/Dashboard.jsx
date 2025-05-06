// frontend/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusStats, setStatusStats] = useState({ Pending: 0, Completed: 0, Cancelled: 0 });
  const [productStats, setProductStats] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders');
      const fetchedOrders = res.data;
      setOrders(fetchedOrders);

      // Count order statuses
      const statusCount = { Pending: 0, Completed: 0, Cancelled: 0 };
      const productCountMap = {};

      fetchedOrders.forEach(order => {
        statusCount[order.status] = (statusCount[order.status] || 0) + 1;

        order.items.forEach(item => {
          const name = item.productId?.name || 'Unknown';
          productCountMap[name] = (productCountMap[name] || 0) + item.quantity;
        });
      });

      setStatusStats(statusCount);
      setProductStats(productCountMap);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const pieChartData = {
    labels: ['Pending', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Order Status',
        data: [statusStats.Pending, statusStats.Completed, statusStats.Cancelled],
        backgroundColor: ['#FF9800', '#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(productStats),
    datasets: [
      {
        label: 'Units Sold',
        data: Object.values(productStats),
        backgroundColor: '#2196F3',
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="charts-wrapper">
        <div className="chart-card">
          <h3>Order Status Distribution</h3>
          <Pie data={pieChartData} />
        </div>

        <div className="chart-card">
          <h3>Top Selling Products</h3>
          <Bar data={barChartData} options={{ indexAxis: 'y' }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
