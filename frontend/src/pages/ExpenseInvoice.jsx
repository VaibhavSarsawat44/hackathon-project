import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Search, Filter, Download, FileText,
  CheckCircle, Clock, DollarSign, TrendingUp, LogOut,
  Receipt, User, Calendar, Hash
} from 'lucide-react';
import { getTrips, getTripBudget } from '../services/tripService';
import { getUser, logout } from '../services/authService';

const ExpenseInvoice = () => {
  const user = getUser();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrips();
  }, []);

  useEffect(() => {
    if (selectedTrip) fetchBudget();
  }, [selectedTrip]);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      const list = data.data.trips || [];
      setTrips(list);
      if (list.length > 0) setSelectedTrip(list[0]);
    } catch (e) {}
  };

  const fetchBudget = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    try {
      const data = await getTripBudget(selectedTrip._id);
      setBudget(data.data);
    } catch (e) { setBudget(null); }
    finally { setLoading(false); }
  };

  // Build expense line items from budget
  const buildLineItems = () => {
    if (!budget) return [];
    const items = [];
    let idx = 1;
    if (budget.breakdown?.transportCost > 0) items.push({ id: idx++, category: 'Transport', description: 'Transport & Flights', qty: '1 trip', unitCost: budget.breakdown.transportCost, amount: budget.breakdown.transportCost });
    if (budget.breakdown?.stayCost > 0) items.push({ id: idx++, category: 'Stay', description: 'Hotel / Accommodation', qty: `${budget.durationDays || 1} nights`, unitCost: Math.round(budget.breakdown.stayCost / (budget.durationDays || 1)), amount: budget.breakdown.stayCost });
    if (budget.breakdown?.mealCost > 0) items.push({ id: idx++, category: 'Meals', description: 'Food & Dining', qty: `${budget.durationDays || 1} days`, unitCost: Math.round(budget.breakdown.mealCost / (budget.durationDays || 1)), amount: budget.breakdown.mealCost });
    if (budget.breakdown?.activityCost > 0) items.push({ id: idx++, category: 'Activities', description: 'Sightseeing & Activities', qty: 'multiple', unitCost: budget.breakdown.activityCost, amount: budget.breakdown.activityCost });
    return items;
  };

  const lineItems = buildLineItems();
  const subtotal = budget?.totalExpenses || 0;
  const tax = Math.round(subtotal * 0.05);
  const discount = Math.round(subtotal * 0.002);
  const grandTotal = subtotal + tax - discount;
  const invoiceId = selectedTrip ? `INV-TL-${selectedTrip._id.slice(-6).toUpperCase()}` : '—';
  const generatedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  const budgetPercent = budget ? Math.min(Math.round((budget.totalExpenses / budget.totalBudget) * 100), 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <Link to="/dashboard" className="text-2xl font-bold tracking-wider hover:text-primary-400 transition-colors">
            Traveloop
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="text" placeholder="Search invoices..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-900/60 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500 w-48" />
            </div>
            <button className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 px-4 py-2 rounded-xl text-sm transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-800 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Back nav */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to My Trips
          </Link>
        </motion.div>

        {/* Trip Selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex flex-wrap gap-3">
            {trips.slice(0, 5).map(trip => (
              <button key={trip._id} onClick={() => setSelectedTrip(trip)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedTrip?._id === trip._id
                    ? 'bg-primary-600 border-primary-500 text-white'
                    : 'bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                }`}>
                {trip.tripName}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !selectedTrip ? (
          <div className="text-center py-20 text-gray-400">Select a trip to view invoice</div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            {/* Main Invoice — 3 cols */}
            <div className="xl:col-span-3 space-y-6">

              {/* Trip Info Card */}
              <motion.div variants={itemVariants}
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Trip Image */}
                  <div className="w-full sm:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800">
                    <img src={selectedTrip.coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&auto=format&fit=crop'}
                      alt={selectedTrip.tripName} className="w-full h-full object-cover" />
                  </div>
                  {/* Trip Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-white font-bold text-xl mb-1">{selectedTrip.tripName}</h2>
                      <p className="text-gray-400 text-sm flex items-center gap-1 mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedTrip.startDate ? new Date(selectedTrip.startDate).toLocaleDateString() : 'TBD'}
                        {' — '}
                        {selectedTrip.endDate ? new Date(selectedTrip.endDate).toLocaleDateString() : 'TBD'}
                      </p>
                      {budget?.durationDays && (
                        <p className="text-gray-500 text-sm">{budget.durationDays} days • {selectedTrip.status}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-gray-500 text-xs">Invoice ID</p>
                          <p className="text-white text-sm font-mono font-semibold">{invoiceId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-gray-500 text-xs">Generated Date</p>
                          <p className="text-white text-sm">{generatedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-gray-500 text-xs">Traveler</p>
                          <p className="text-white text-sm font-medium">{user?.name || 'Traveler'}</p>
                        </div>
                      </div>
                    </div>
                    {/* Payment Status */}
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${
                        paid
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}>
                        {paid ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        Payment status — {paid ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Expense Table */}
              <motion.div variants={itemVariants}
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary-400" /> Expense Breakdown
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-900/40">
                        {['#', 'Category', 'Description', 'Qty / Details', 'Unit Cost', 'Amount'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-gray-400 text-sm font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-gray-500 text-sm">
                            No expense data. Add trips with budget details.
                          </td>
                        </tr>
                      ) : lineItems.map((item, i) => (
                        <motion.tr key={item.id}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                          <td className="px-5 py-4 text-gray-400 text-sm">{item.id}</td>
                          <td className="px-5 py-4">
                            <span className="bg-primary-500/10 text-primary-300 border border-primary-500/20 px-2.5 py-1 rounded-lg text-xs font-medium capitalize">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-white text-sm">{item.description}</td>
                          <td className="px-5 py-4 text-gray-300 text-sm">{item.qty}</td>
                          <td className="px-5 py-4 text-gray-300 text-sm">₹{item.unitCost.toLocaleString()}</td>
                          <td className="px-5 py-4 text-white font-semibold text-sm">₹{item.amount.toLocaleString()}</td>
                        </motion.tr>
                      ))}
                      {/* Empty filler rows */}
                      {Array.from({ length: Math.max(0, 3 - lineItems.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b border-gray-800/40">
                          {Array.from({ length: 6 }).map((_, j) => (
                            <td key={j} className="px-5 py-4"><div className="h-3 bg-gray-800/30 rounded" /></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                    {/* Totals */}
                    <tfoot className="border-t-2 border-gray-700">
                      <tr>
                        <td colSpan={4} />
                        <td className="px-5 py-3 text-gray-400 text-sm">Subtotal</td>
                        <td className="px-5 py-3 text-white font-semibold">₹{subtotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} />
                        <td className="px-5 py-2 text-gray-400 text-sm">Tax (5%)</td>
                        <td className="px-5 py-2 text-amber-400 font-medium">+ ₹{tax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} />
                        <td className="px-5 py-2 text-gray-400 text-sm">Discount</td>
                        <td className="px-5 py-2 text-green-400 font-medium">- ₹{discount.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-primary-500/5 border-t border-primary-500/20">
                        <td colSpan={4} />
                        <td className="px-5 py-4 text-white font-bold text-lg">Grand Total</td>
                        <td className="px-5 py-4 text-primary-400 font-black text-xl">₹{grandTotal.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-gray-900/60 border border-gray-700 hover:border-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                  <Download className="w-4 h-4 text-primary-400" /> Download Invoice
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-gray-900/60 border border-gray-700 hover:border-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                  <FileText className="w-4 h-4 text-indigo-400" /> Export as PDF
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setPaid(!paid)}
                  className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all ml-auto ${
                    paid
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg'
                  }`}>
                  <CheckCircle className="w-4 h-4" /> {paid ? 'Paid ✓' : 'Mark as Paid'}
                </motion.button>
              </motion.div>
            </div>

            {/* Budget Insights — 1 col */}
            <div className="space-y-6">
              <motion.div variants={itemVariants}
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sticky top-8">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" /> Budget Insights
                </h3>

                {/* Donut Chart */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#1f2937" strokeWidth="14" />
                      <circle cx="60" cy="60" r="45" fill="none"
                        stroke={budget?.isOverBudget ? '#ef4444' : '#6366f1'}
                        strokeWidth="14"
                        strokeDasharray={`${budgetPercent * 2.827} ${282.7}`}
                        strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-xl font-black ${budget?.isOverBudget ? 'text-red-400' : 'text-white'}`}>
                        {budgetPercent}%
                      </span>
                      <span className="text-gray-500 text-xs">used</span>
                    </div>
                  </div>
                </div>

                {/* Budget Numbers */}
                <div className="space-y-4">
                  {[
                    { label: 'Total Budget', value: `₹${(budget?.totalBudget || 0).toLocaleString()}`, color: 'text-white' },
                    { label: 'Total Spent', value: `₹${subtotal.toLocaleString()}`, color: budget?.isOverBudget ? 'text-red-400' : 'text-amber-400' },
                    { label: 'Remaining', value: `₹${(budget?.remainingBudget || 0).toLocaleString()}`, color: budget?.isOverBudget ? 'text-red-400' : 'text-green-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center py-3 border-b border-gray-800/60 last:border-0">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className={`font-bold text-sm ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {budget?.isOverBudget && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-xs font-medium text-center">⚠️ Over Budget!</p>
                  </div>
                )}

                {/* Breakdown bars */}
                {budget?.breakdown && (
                  <div className="mt-6 space-y-3">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Category Breakdown</p>
                    {[
                      { label: 'Transport', value: budget.breakdown.transportCost, color: 'bg-blue-500' },
                      { label: 'Stay', value: budget.breakdown.stayCost, color: 'bg-purple-500' },
                      { label: 'Meals', value: budget.breakdown.mealCost, color: 'bg-amber-500' },
                      { label: 'Activities', value: budget.breakdown.activityCost, color: 'bg-primary-500' },
                    ].filter(b => b.value > 0).map(b => {
                      const pct = budget.totalBudget > 0 ? Math.round((b.value / budget.totalBudget) * 100) : 0;
                      return (
                        <div key={b.label}>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{b.label}</span><span>{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className={`h-full rounded-full ${b.color}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Link to={`/dashboard`}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-xl transition-colors text-sm">
                  <DollarSign className="w-4 h-4 text-primary-400" /> View Full Budget
                </Link>
              </motion.div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExpenseInvoice;
