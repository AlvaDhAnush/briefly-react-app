import React from 'react';

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <input
        type="date"
        className="border p-2"
        value={filters.date}
        onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Category"
        className="border p-2"
        value={filters.category}
        onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Source"
        className="border p-2"
        value={filters.source}
        onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
      />
    </div>
  );
};

export default Filters;