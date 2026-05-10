import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Filter, SortDesc, Download, FileText, 
  CheckCircle, Clock, MapPin, Receipt, PieChart 
} from 'lucide-react';

const ExpenseInvoice = () => {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [sortOrder, setSortOrder] = useState('asc');

  const invoiceItems = [
    { id: 1, category: 'hotel', description: 'hotel booking paris', qty: '3 nights', unitCost: 3000, amount: 9000 },
    { id: 2, category: 'travel', description: 'flight bookings (DEL -> PAR)', qty: '1', unitCost: 12000, amount: 12000 },
  ];

  const subtotal = invoiceItems.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * 0.05;
  const discount = 50;
  const total = subtotal + tax - discount;

  const totalBudget = 20000;
  const totalSpent = total;
  const remaining = totalBudget - totalSpent;
  const percentageSpent = Math.min((totalSpent / totalBudget) * 100, 100);

  const togglePaymentStatus = () => {
    setPaymentStatus(prev => prev === 'pending' ? 'paid' : 'pending');
  };

  const handleDownload = () => alert("Downloading invoice...");
  const handleExport = () => alert("Exporting as PDF...");

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-primary-500/30 pb-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/my-trips" className="flex items-center text-gray-400 hover:text-white transition-colors mb-4 w-fit">
              <ArrowLeft className="w-4 h-4 mr-2" /> back to My Trips
            </Link>
            <div className="flex items-center gap-3">
              <Receipt className="w-8 h-8 text-emerald-400" />
              <h1 className="text-3xl font-bold tracking-tight">Expense Invoice <span className="text-gray-500 font-light text-xl">/ billing screen</span></h1>
            </div>
            <p className="text-gray-500 mt-1">Screen 14</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all text-sm font-medium">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all text-sm font-medium">
              <SortDesc className="w-4 h-4" /> Sort
            </button>
            {/* Mock User Avatar */}
            <div className="w-10 h-10 rounded-full border-2 border-gray-700 overflow-hidden ml-2">
              <img src="https://i.pravatar.cc/150?img=11" alt="User" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Trip Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-2 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 shadow-2xl"
          >
            <div className="w-full md:w-1/3 aspect-square md:aspect-auto rounded-2xl overflow-hidden border border-gray-800 relative bg-gray-800 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&auto=format&fit=crop&q=80" alt="Paris" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-between py-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Trip to Europe Adventure</h2>
                  <div className="flex items-center text-sm text-gray-400 gap-4 mb-1">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary-400" /> May 30 - Jun 05, 2025</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-indigo-400" /> 4 cities</span>
                  </div>
                  <p className="text-xs text-gray-500">Created by James</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 border-t border-gray-800/50 pt-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Invoice Id</p>
                  <p className="font-mono text-white text-sm">INV-xyz-30290</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Generated date</p>
                  <p className="text-white text-sm">May 20, 2025</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Traveler Details:</p>
                  <div className="flex -space-x-2 mt-1">
                     {['James','Arjun','Mary','Christina'].map((name, i) => (
                       <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold" title={name}>
                         {name[0]}
                       </div>
                     ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment status</p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {paymentStatus === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Budget Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
               <PieChart className="w-5 h-5 text-gray-400" />
               <h3 className="text-lg font-bold">budget Insights</h3>
            </div>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 rounded-full flex items-center justify-center" 
                   style={{ background: `conic-gradient(from 0deg, #10b981 ${percentageSpent}%, #1f2937 ${percentageSpent}%)` }}>
                <div className="absolute inset-2 bg-gray-950 rounded-full flex items-center justify-center">
                   <span className="text-sm font-bold text-white">{percentageSpent.toFixed(0)}%</span>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Total Budget</p>
                  <p className="font-bold text-white">${totalBudget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Total Spent</p>
                  <p className="font-bold text-emerald-400">${totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Remaining</p>
                  <p className={`font-bold ${remaining < 0 ? 'text-red-400' : 'text-gray-300'}`}>${remaining.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-900 border border-gray-700 hover:bg-gray-800 rounded-xl text-sm font-bold transition-all text-white">
              View Full Budget
            </button>
          </motion.div>
        </div>

        {/* Expense Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl mb-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/80 border-b border-gray-800 text-gray-400 text-sm tracking-wider">
                  <th className="px-6 py-4 font-medium w-16">#</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Qty/details</th>
                  <th className="px-6 py-4 font-medium text-right">Unit Cost</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {invoiceItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                    <td className="px-6 py-4 font-medium capitalize">{item.category}</td>
                    <td className="px-6 py-4 text-gray-300">{item.description}</td>
                    <td className="px-6 py-4 text-gray-400">{item.qty}</td>
                    <td className="px-6 py-4 text-right text-gray-300">${item.unitCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-white">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
                {/* Empty rows to match wireframe visual */}
                <tr className="border-b border-gray-800/50"><td colSpan="6" className="py-6"></td></tr>
                <tr className="border-b border-gray-800/50"><td colSpan="6" className="py-6"></td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900/80 border-t border-gray-800 p-6 flex flex-col md:flex-row justify-end text-sm">
            <div className="w-full md:w-64 space-y-3">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>tax(5%)</span>
                <span className="text-white">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Discount</span>
                <span className="text-emerald-400">-${discount.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-800 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap justify-between gap-4"
        >
          <div className="flex gap-4">
            <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 hover:bg-gray-800 rounded-xl transition-all font-bold">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <button onClick={handleExport} className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 hover:bg-gray-800 rounded-xl transition-all font-bold">
              <FileText className="w-4 h-4" /> Export as PDF
            </button>
          </div>
          <button 
            onClick={togglePaymentStatus} 
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all font-bold shadow-lg min-w-[200px] ${
              paymentStatus === 'paid' 
                ? 'bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
            }`}
          >
            {paymentStatus === 'paid' ? <CheckCircle className="w-5 h-5" /> : null}
            {paymentStatus === 'paid' ? 'Paid' : 'Mark as paid'}
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default ExpenseInvoice;
