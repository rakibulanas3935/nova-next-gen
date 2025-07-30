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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-white">
      {/* Sidebar Background Blur */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-md border-r border-white/20 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-300">
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => { setActiveItem(name); setSidebarOpen(false); }}
                className={`w-full flex items-center px-4 py-3 rounded-xl space-x-3 transition-all ${
                  activeItem === name
                    ? 'bg-white/20 text-white shadow'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-30 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white hover:text-gray-300">
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold">{activeItem}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20">
                <Search className="text-gray-300 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white placeholder-gray-300 outline-none w-48"
                />
              </div>
              <button className="relative p-2 text-gray-300 hover:text-white">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              </button>
              <Settings className="text-gray-300 hover:text-white cursor-pointer" size={20} />
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
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
      </div>
    </div>
  );
};

export default Dashboard;
