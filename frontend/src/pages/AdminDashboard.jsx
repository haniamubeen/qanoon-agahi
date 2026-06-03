import React, { useState, useEffect, useRef } from 'react';
import { Users, UserCheck, UserX, Activity, Search, ChevronDown, ChevronUp, BarChart3, Eye, Trash2, MoreHorizontal, TrendingUp, Globe, Calendar } from 'lucide-react';

/* ───── Mock Data ───── */
const mockUsers = [
  { id: 1, name: "Ahmed Raza", email: "ahmed.raza@gmail.com", city: "Lahore", age: 32, status: "active", joinDate: "2026-04-15", queries: 47 },
  { id: 2, name: "Fatima Shah", email: "fatima.shah@outlook.com", city: "Karachi", age: 28, status: "active", joinDate: "2026-04-18", queries: 32 },
  { id: 3, name: "Usman Khan", email: "usman.khan@yahoo.com", city: "Islamabad", age: 24, status: "active", joinDate: "2026-04-22", queries: 18 },
  { id: 4, name: "Ayesha Malik", email: "ayesha.m@gmail.com", city: "Peshawar", age: 35, status: "inactive", joinDate: "2026-05-01", queries: 5 },
  { id: 5, name: "Hassan Ali", email: "hassan.ali@hotmail.com", city: "Multan", age: 41, status: "active", joinDate: "2026-05-03", queries: 63 },
  { id: 6, name: "Sana Noor", email: "sana.noor@gmail.com", city: "Lahore", age: 22, status: "pending", joinDate: "2026-05-05", queries: 0 },
  { id: 7, name: "Bilal Ahmed", email: "bilal.ahmed@edu.pk", city: "Faisalabad", age: 19, status: "active", joinDate: "2026-05-08", queries: 12 },
  { id: 8, name: "Zara Hussain", email: "zara.h@outlook.com", city: "Quetta", age: 30, status: "active", joinDate: "2026-05-10", queries: 28 },
  { id: 9, name: "Imran Siddiqui", email: "imran.s@gmail.com", city: "Rawalpindi", age: 45, status: "inactive", joinDate: "2026-05-11", queries: 3 },
  { id: 10, name: "Nadia Parveen", email: "nadia.p@yahoo.com", city: "Hyderabad", age: 27, status: "active", joinDate: "2026-05-14", queries: 21 },
  { id: 11, name: "Owais Rauf", email: "owais.rauf@gmail.com", city: "Sialkot", age: 33, status: "active", joinDate: "2026-05-15", queries: 9 },
  { id: 12, name: "Mehwish Tariq", email: "mehwish.t@edu.pk", city: "Karachi", age: 20, status: "pending", joinDate: "2026-05-17", queries: 0 },
];

const monthlySignups = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 19 },
  { month: "Mar", count: 28 },
  { month: "Apr", count: 45 },
  { month: "May", count: 52 },
];

const cityDistribution = [
  { city: "Lahore", count: 35, color: "#16a34a" },
  { city: "Karachi", count: 28, color: "#22c55e" },
  { city: "Islamabad", count: 18, color: "#4ade80" },
  { city: "Peshawar", count: 12, color: "#86efac" },
  { city: "Others", count: 22, color: "#bbf7d0" },
];

/* ───── Bar Chart Component (Canvas) ───── */
function BarChart({ data, width = 400, height = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#8b949e' : '#3d6e45';
    const barColor = isDark ? '#22c55e' : '#16a34a';
    const barHoverColor = isDark ? '#4ade80' : '#22c55e';

    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...data.map(d => d.count)) * 1.2;
    const barWidth = chartW / data.length * 0.6;
    const gap = chartW / data.length * 0.4;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = isDark ? 'rgba(48,54,61,0.5)' : 'rgba(205,227,209,0.8)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = textColor;
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 8, y + 4);
    }

    // Bars with rounded tops
    data.forEach((d, i) => {
      const x = padding.left + (chartW / data.length) * i + gap / 2;
      const barH = (d.count / maxVal) * chartH;
      const y = padding.top + chartH - barH;
      const radius = 6;

      // Gradient fill
      const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
      grad.addColorStop(0, barColor);
      grad.addColorStop(1, isDark ? 'rgba(34,197,94,0.3)' : 'rgba(22,163,74,0.4)');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(x, padding.top + chartH);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, padding.top + chartH);
      ctx.closePath();
      ctx.fill();

      // Value on top
      ctx.fillStyle = textColor;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.count, x + barWidth / 2, y - 6);

      // Month label
      ctx.fillStyle = textColor;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText(d.month, x + barWidth / 2, height - 12);
    });
  }, [data, width, height]);

  return <canvas ref={canvasRef} className="w-full max-w-full" />;
}

/* ───── Doughnut Chart Component (Canvas) ───── */
function DoughnutChart({ data, width = 220, height = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const isDark = document.documentElement.classList.contains('dark');
    const total = data.reduce((s, d) => s + d.count, 0);
    const cx = width / 2;
    const cy = height / 2;
    const outerR = Math.min(cx, cy) - 10;
    const innerR = outerR * 0.6;

    ctx.clearRect(0, 0, width, height);

    let startAngle = -Math.PI / 2;
    data.forEach((d) => {
      const sliceAngle = (d.count / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = isDark ? '#e2e8f0' : '#0f2215';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 8);
    ctx.fillStyle = isDark ? '#8b949e' : '#5a9464';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Total Users', cx, cy + 14);
  }, [data, width, height]);

  return <canvas ref={canvasRef} />;
}

/* ───── Stat Card ───── */
function StatCard({ icon: Icon, label, value, trend, trendUp, color }) {
  return (
    <div className="bg-brand-50 dark:bg-dark-surface border border-brand-100 dark:border-dark-border rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-brand-500 dark:text-slate-400 font-medium">{label}</p>
        <p className="text-2xl font-extrabold text-brand-900 dark:text-white">{value}</p>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
          <TrendingUp size={12} className={!trendUp ? 'rotate-180' : ''} />
          {trend}
        </div>
      )}
    </div>
  );
}

/* ───── Status Badge ───── */
function StatusBadge({ status }) {
  const styles = {
    active: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
    inactive: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status] || styles.active}`}>
      {status}
    </span>
  );
}

/* ───── Main Dashboard ───── */
export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('joinDate');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const activeCount = mockUsers.filter(u => u.status === 'active').length;
  const inactiveCount = mockUsers.filter(u => u.status === 'inactive').length;
  const pendingCount = mockUsers.filter(u => u.status === 'pending').length;
  const totalQueries = mockUsers.reduce((s, u) => s + u.queries, 0);

  // Filter + Search
  const filtered = mockUsers
    .filter(u => statusFilter === 'all' || u.status === statusFilter)
    .filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortField === 'name') return a.name.localeCompare(b.name) * dir;
      if (sortField === 'email') return a.email.localeCompare(b.email) * dir;
      if (sortField === 'queries') return (a.queries - b.queries) * dir;
      if (sortField === 'joinDate') return (new Date(a.joinDate) - new Date(b.joinDate)) * dir;
      return 0;
    });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }) => (
    sortField === field
      ? (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)
      : <ChevronDown size={14} className="opacity-30" />
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === filtered.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filtered.map(u => u.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-16 bg-brand-50 dark:bg-dark-bg min-h-screen">

      {/* Header */}
      <div className="bg-brand-100 dark:bg-dark-surface border-b border-brand-200 dark:border-dark-border px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-brand-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-brand-500 dark:text-slate-400 mt-1">Manage users, view analytics, and monitor platform activity.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Users" value={mockUsers.length} trend="+18%" trendUp color="bg-accent-600" />
          <StatCard icon={UserCheck} label="Active Users" value={activeCount} trend="+12%" trendUp color="bg-emerald-500" />
          <StatCard icon={UserX} label="Inactive" value={inactiveCount} trend="-5%" trendUp={false} color="bg-red-500" />
          <StatCard icon={Activity} label="Total Queries" value={totalQueries} trend="+24%" trendUp color="bg-amber-500" />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Bar Chart */}
          <div className="lg:col-span-3 bg-brand-50 dark:bg-dark-surface border border-brand-100 dark:border-dark-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-brand-900 dark:text-white flex items-center gap-2">
                  <BarChart3 size={18} className="text-accent-600" /> Monthly Signups
                </h3>
                <p className="text-xs text-brand-400 dark:text-dark-muted mt-1">New user registrations per month</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-2.5 py-1 rounded-full">
                <TrendingUp size={12} /> +15.6%
              </div>
            </div>
            <BarChart data={monthlySignups} width={500} height={220} />
          </div>

          {/* Doughnut Chart */}
          <div className="lg:col-span-2 bg-brand-50 dark:bg-dark-surface border border-brand-100 dark:border-dark-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-brand-900 dark:text-white flex items-center gap-2 mb-6">
              <Globe size={18} className="text-accent-600" /> Users by City
            </h3>
            <div className="flex flex-col items-center gap-4">
              <DoughnutChart data={cityDistribution} width={180} height={180} />
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full">
                {cityDistribution.map((d) => (
                  <div key={d.city} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-brand-600 dark:text-slate-400">{d.city}</span>
                    <span className="ml-auto font-semibold text-brand-800 dark:text-slate-200">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── User Table ── */}
        <div className="bg-brand-50 dark:bg-dark-surface border border-brand-100 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-brand-100 dark:border-dark-border">
            <h3 className="font-bold text-brand-900 dark:text-white text-lg flex items-center gap-2">
              <Users size={20} className="text-accent-600" /> All Users
              <span className="text-sm font-normal text-brand-400 dark:text-dark-muted ml-1">({filtered.length})</span>
            </h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-3 py-2 text-sm bg-brand-50 dark:bg-dark-bg border border-brand-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-1 focus:ring-accent-500 text-brand-700 dark:text-slate-300"
                />
              </div>
              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm bg-brand-50 dark:bg-dark-bg border border-brand-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-1 focus:ring-accent-500 text-brand-700 dark:text-slate-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100/50 dark:bg-dark-bg/50 text-left">
                  <th className="py-3 px-5 w-10">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded text-accent-600 focus:ring-accent-500"
                    />
                  </th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400 cursor-pointer select-none" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-1">Name <SortIcon field="name" /></div>
                  </th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400 cursor-pointer select-none" onClick={() => toggleSort('email')}>
                    <div className="flex items-center gap-1">Email <SortIcon field="email" /></div>
                  </th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400">City</th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400">Age</th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400">Status</th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400 cursor-pointer select-none" onClick={() => toggleSort('queries')}>
                    <div className="flex items-center gap-1">Queries <SortIcon field="queries" /></div>
                  </th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400 cursor-pointer select-none" onClick={() => toggleSort('joinDate')}>
                    <div className="flex items-center gap-1">Joined <SortIcon field="joinDate" /></div>
                  </th>
                  <th className="py-3 px-3 font-semibold text-brand-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 dark:divide-dark-border">
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-brand-100/40 dark:hover:bg-dark-card/50 transition-colors ${selectedUsers.includes(user.id) ? 'bg-accent-50/50 dark:bg-accent-900/10' : ''}`}
                  >
                    <td className="py-3 px-5">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                        className="rounded text-accent-600 focus:ring-accent-500"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-sm font-bold text-accent-700 dark:text-accent-400">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-brand-800 dark:text-slate-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-brand-500 dark:text-slate-400">{user.email}</td>
                    <td className="py-3 px-3 text-brand-600 dark:text-slate-300">{user.city}</td>
                    <td className="py-3 px-3 text-brand-600 dark:text-slate-300">{user.age}</td>
                    <td className="py-3 px-3"><StatusBadge status={user.status} /></td>
                    <td className="py-3 px-3 font-semibold text-brand-800 dark:text-slate-200">{user.queries}</td>
                    <td className="py-3 px-3 text-brand-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="flex-shrink-0" />
                        {new Date(user.joinDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-brand-100 dark:hover:bg-dark-card text-brand-400 hover:text-accent-600 transition-colors" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-brand-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between p-4 border-t border-brand-100 dark:border-dark-border text-sm text-brand-500 dark:text-slate-400">
            <span>Showing {filtered.length} of {mockUsers.length} users</span>
            {selectedUsers.length > 0 && (
              <span className="text-accent-600 dark:text-accent-400 font-semibold">{selectedUsers.length} selected</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
