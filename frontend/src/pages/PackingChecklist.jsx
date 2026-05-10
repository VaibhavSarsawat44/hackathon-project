import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiList, FiShare2, FiRefreshCcw, FiPlus, FiCheck, FiChevronDown } from 'react-icons/fi';

const initialItems = [
  { id: 1, category: 'Documents', name: 'Passport', isPacked: true },
  { id: 2, category: 'Documents', name: 'Flight Tickets (printed)', isPacked: true },
  { id: 3, category: 'Documents', name: 'Travel insurance', isPacked: true },
  { id: 4, category: 'Documents', name: 'Hotel booking confirmation', isPacked: false },
  
  { id: 5, category: 'Clothing', name: 'Casual Shirts', isPacked: true },
  { id: 6, category: 'Clothing', name: 'Trousers / jeans', isPacked: false },
  { id: 7, category: 'Clothing', name: 'Comfortable walking shoes', isPacked: false },
  { id: 8, category: 'Clothing', name: 'Light jacket / windbreaker', isPacked: false },

  { id: 9, category: 'Electronics', name: 'Phone charger', isPacked: true },
  { id: 10, category: 'Electronics', name: 'Universal power adapter', isPacked: false },
  { id: 11, category: 'Electronics', name: 'Earphones / headphones', isPacked: false },
];

const PackingChecklist = () => {
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('Paris & Rome Adventure');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Documents');

  // Derived state
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, searchQuery]);

  const packedCount = items.filter(i => i.isPacked).length;
  const totalCount = items.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  // Group by category
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  const toggleItem = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, isPacked: !i.isPacked } : i));
  };

  const resetAll = () => {
    if(window.confirm("Are you sure you want to uncheck all items?")) {
      setItems(items.map(i => ({ ...i, isPacked: false })));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      category: newItemCategory,
      name: newItemName.trim(),
      isPacked: false,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setShowAddModal(false);
  };

  const shareChecklist = () => {
    alert("Checklist link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Packing Checklist</h1>
            <p className="text-gray-500 text-sm mt-1">Screen 11</p>
          </div>
          {/* User avatar mockup for layout parity */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 shadow-md"></div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass p-4 rounded-xl">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex">
              <FiList className="text-gray-500" /> Group by
            </button>
            <button className="flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex">
              <FiFilter className="text-gray-500" /> Filter
            </button>
            <button className="flex-1 sm:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex">
              Sort by <FiChevronDown className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Trip Selection & Progress */}
        <div className="glass p-6 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative inline-block w-full sm:w-auto">
              <select 
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="appearance-none w-full sm:w-auto bg-gray-100/80 border border-gray-200 text-gray-800 py-2 pl-4 pr-10 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="Paris & Rome Adventure">Trip: Paris & Rome Adventure</option>
                <option value="Bali Getaway">Trip: Bali Getaway</option>
                <option value="Tokyo Explorer">Trip: Tokyo Explorer</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            
            <div className="text-sm font-medium text-gray-600">
              Progress: <span className="text-primary-600 font-bold">{packedCount}/{totalCount}</span> items packed
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, catItems]) => {
            const catPackedCount = catItems.filter(i => i.isPacked).length;
            const catTotalCount = catItems.length;
            
            return (
              <div key={category} className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50/80 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                  <span className="text-sm font-medium text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                    {catPackedCount}/{catTotalCount}
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {catItems.map((item) => (
                    <label 
                      key={item.id} 
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 cursor-pointer transition-colors group"
                    >
                      <div className={`relative flex items-center justify-center w-6 h-6 rounded border transition-all duration-200 ${item.isPacked ? 'bg-primary-500 border-primary-500' : 'border-gray-300 group-hover:border-primary-400 bg-white'}`}>
                        <input 
                          type="checkbox" 
                          className="opacity-0 absolute inset-0 cursor-pointer"
                          checked={item.isPacked}
                          onChange={() => toggleItem(item.id)}
                        />
                        {item.isPacked && <FiCheck className="text-white text-sm" />}
                      </div>
                      <span className={`text-base transition-colors duration-200 ${item.isPacked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                    </label>
                  ))}
                  {catItems.length === 0 && (
                    <div className="px-6 py-4 text-gray-500 text-sm italic">No items found matching your search.</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 pb-8">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-6 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm"
          >
            <FiPlus /> Add item to checklist
          </button>
          <button 
            onClick={resetAll}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FiRefreshCcw /> Reset all
          </button>
          <button 
            onClick={shareChecklist}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-md"
          >
            <FiShare2 /> Share Checklist
          </button>
        </div>

      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add New Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddItem} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. Sunglasses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {Array.from(new Set(items.map(i => i.category))).concat(['Other']).filter((v, i, a) => a.indexOf(v) === i).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default PackingChecklist;
