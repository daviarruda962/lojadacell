import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { iPhoneSeries } from '../types/iphone';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedSeries: iPhoneSeries | 'Todas';
  onSeriesChange: (series: iPhoneSeries | 'Todas') => void;
  selectedCondition: string;
  onConditionChange: (condition: string) => void;
  selectedStorage: string;
  onStorageChange: (storage: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  totalFiltered: number;
}

const SERIES_LIST: (iPhoneSeries | 'Todas')[] = [
  'Todas',
  'iPhone 18',
  'iPhone 17',
  'iPhone 16',
  'iPhone 15',
  'iPhone 14',
  'iPhone 13',
  'iPhone 12',
  'iPhone 11',
  'iPhone X / XS / XR',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSeries,
  onSeriesChange,
  selectedCondition,
  onConditionChange,
  selectedStorage,
  onStorageChange,
  sortBy,
  onSortByChange,
  totalFiltered,
}) => {
  return (
    <div className="space-y-3">
      {/* Search Input & Sorter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar modelo, cor, GB (ex: 15 Pro, 16e, 17 Air, 128GB, XR)..."
            className="w-full pl-10 pr-9 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          <span className="text-neutral-500 font-medium">
            {totalFiltered} {totalFiltered === 1 ? 'modelo disponível' : 'modelos disponíveis'}
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent border-none text-xs text-neutral-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="battery-desc">Maior Bateria %</option>
              <option value="newest">Mais Recentes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Series Filter Tabs (Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {SERIES_LIST.map((series) => {
          const isActive = selectedSeries === series;
          return (
            <button
              key={series}
              onClick={() => onSeriesChange(series)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/80'
              }`}
            >
              {series}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters: Condição & Armazenamento */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-neutral-600">
        {[
          {
            label: 'Condição',
            value: selectedCondition,
            options: ['todas', 'lacrado', 'seminovo'],
            onChange: onConditionChange,
            display: (v: string) => (v === 'todas' ? 'Todos' : v === 'lacrado' ? 'Lacrados' : 'Seminovos'),
          },
          {
            label: 'Armazenamento',
            value: selectedStorage,
            options: ['Todos', '64GB', '128GB', '256GB', '512GB', '1TB'],
            onChange: onStorageChange,
            display: (v: string) => v,
          },
        ].map((filter) => (
          <FilterDropdown
            key={filter.label}
            label={filter.label}
            selectedValue={filter.value}
            options={filter.options}
            onChange={filter.onChange}
            displayFn={filter.display}
          />
        ))}

        {(selectedSeries !== 'Todas' ||
          selectedCondition !== 'todas' ||
          selectedStorage !== 'Todos' ||
          searchQuery) && (
          <button
            onClick={() => {
              onSeriesChange('Todas');
              onConditionChange('todas');
              onStorageChange('Todos');
              onSearchChange('');
            }}
            className="text-neutral-500 hover:text-neutral-900 font-medium ml-auto"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
};

const FilterDropdown = ({
  label,
  selectedValue,
  options,
  onChange,
  displayFn,
}: {
  label: string;
  selectedValue: string;
  options: string[];
  onChange: (val: string) => void;
  displayFn: (val: string) => string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
      >
        <span className="text-neutral-900 font-semibold">{label}:</span>
        {displayFn(selectedValue)}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 ${
                selectedValue === opt ? 'bg-neutral-50 text-neutral-900 font-medium' : 'text-neutral-600'
              }`}
            >
              {displayFn(opt)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
