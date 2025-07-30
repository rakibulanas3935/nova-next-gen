"use client";
import React, { useState } from 'react';
import {
  Home, Calendar, BookOpen, FolderOpen, Image,
  FileText, ShoppingBag, Users, Menu, X, Search,
  Bell, Settings, User, Activity, TrendingUp, Eye
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Sample Data
const barData = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 45 },
  { name: "Mar", users: 60 },
  { name: "Apr", users: 50 },
  { name: "May", users: 80 },
  { name: "Jun", users: 70 },
];

const pieData = [
  { name: "Active", value: 70 },
  { name: "Inactive", value: 30 },
];

const COLORS = ["#6366f1", "#14b8a6"];

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Events", icon: Calendar },
    { name: "Learn", icon: BookOpen },
    { name: "Projects", icon: FolderOpen },
    { name: "Gallery", icon: Image },
    { name: "Blog", icon: FileText },
    { name: "Merchandise", icon: ShoppingBag },
    { name: "Users", icon: Users },
  ];

  const stats = [
    { title: "Total Users", value: "12,345", change: "+12%", icon: Users },
    { title: "Active Projects", value: "89", change: "+8%", icon: FolderOpen },
    { title: "Monthly Views", value: "45.2K", change: "+23%", icon: Eye },
    { title: "Revenue", value: "$32,450", change: "+15%", icon: TrendingUp },
  ];

  const recentActivity = [
    { action: "New user registration", time: "2 minutes ago", user: "John Doe" },
    { action: "Project completed", time: "15 minutes ago", user: "Sarah Wilson" },
    { action: "Blog post published", time: "1 hour ago", user: "Mike Johnson" },
    { action: "Event scheduled", time: "2 hours ago", user: "Emma Davis" },
  ];

  return (
    <>
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(({ title, value, change, icon: Icon }) => (
              <div key={title} className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg">
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="text-green-400 text-sm font-medium">{change}</span>
                </div>
                <h3 className="text-gray-300 text-sm mb-1">{title}</h3>
                <p className="text-white text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          {/* Analytics + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6">User Growth</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-6">User Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-10 bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.user} – {activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
    </>
  );
};

export default Dashboard;
