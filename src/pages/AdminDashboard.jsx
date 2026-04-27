import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, Legend // 👈 Legend included
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, avgValue: 0 });
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    // 1. Fetching real data from LocalStorage
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const revenue = savedOrders.reduce((acc, order) => acc + order.total, 0);
    
    setStats({
      totalOrders: savedOrders.length,
      totalRevenue: revenue,
      avgValue: savedOrders.length > 0 ? (revenue / savedOrders.length).toFixed(2) : 0
    });

    // 2. Data grouping for Chart
    const grouped = savedOrders.reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      if (!acc[date]) acc[date] = { name: date, Revenue: 0 }; // Renamed key to 'Revenue' for clean legend
      acc[date].Revenue += order.total;
      return acc;
    }, {});

    setChartData(Object.values(grouped));
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#232f3e' }}>Executive Dashboard 📊</h1>
        <p style={{ color: '#666' }}>Day 29 Final Polish: Zero warnings & smooth visualizations.</p>
      </header>

      {/* KPI Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        <div style={tileStyle}>
          <p style={labelStyle}>Total Revenue</p>
          <h2 style={valueStyle}>${stats.totalRevenue.toFixed(2)}</h2>
          <div style={{ color: '#2ecc71', fontSize: '14px', fontWeight: 'bold' }}>↑ Growth Tracked</div>
        </div>
        <div style={tileStyle}>
          <p style={labelStyle}>Orders</p>
          <h2 style={valueStyle}>{stats.totalOrders}</h2>
          <div style={{ color: '#3498db', fontSize: '14px', fontWeight: 'bold' }}>Sales Volume</div>
        </div>
        <div style={tileStyle}>
          <p style={labelStyle}>Avg. Order</p>
          <h2 style={valueStyle}>${stats.avgValue}</h2>
          <div style={{ color: '#8e44ad', fontSize: '14px', fontWeight: 'bold' }}>Ticket Size</div>
        </div>
      </div>

      {/* 📈 Enhanced Chart Section */}
      <div style={{ background: 'white', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '20px' }}>Performance Trend</h3>
          <div style={{ background: '#f5f5f5', padding: '5px', borderRadius: '10px' }}>
            <button onClick={() => setChartType('bar')} style={chartType === 'bar' ? activeBtn : inactiveBtn}>Bar View</button>
            <button onClick={() => setChartType('line')} style={chartType === 'line' ? activeBtn : inactiveBtn}>Line View</button>
          </div>
        </div>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            {chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#fcfcfc'}} contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} /> {/* 👈 Legend is used here! */}
                <Bar dataKey="Revenue" fill="#FFD814" radius={[6, 6, 0, 0]} animationDuration={1500} />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} /> {/* 👈 Legend is used here too! */}
                <Line type="monotone" dataKey="Revenue" stroke="#232f3e" strokeWidth={4} dot={{ r: 6, fill: '#FFD814' }} animationDuration={1500} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Internal Styles
const tileStyle = { background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', textAlign: 'center', border: '1px solid #f0f0f0' };
const labelStyle = { margin: 0, color: '#888', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' };
const valueStyle = { margin: '15px 0', fontSize: '36px', fontWeight: 'bold', color: '#232f3e' };
const activeBtn = { padding: '10px 20px', border: 'none', borderRadius: '8px', background: '#232f3e', color: 'white', cursor: 'pointer', fontWeight: 'bold' };
const inactiveBtn = { padding: '10px 20px', border: 'none', borderRadius: '8px', background: 'transparent', color: '#666', cursor: 'pointer' };
const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '10px' };

export default AdminDashboard;