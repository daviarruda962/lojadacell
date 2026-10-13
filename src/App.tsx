/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  Smartphone, 
  Instagram, 
  Lock
} from 'lucide-react';

import { iPhoneItem, StoreSettings, iPhoneSeries } from './types/iphone';
import { INITIAL_INVENTORY, DEFAULT_STORE_SETTINGS } from './data/catalog';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { AiImportModal } from './components/AiImportModal';
import { ProductFormModal } from './components/ProductFormModal';
import { StoreSettingsModal } from './components/StoreSettingsModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { generateGenericWhatsAppLink } from './utils/formatters';

const STORAGE_KEY_ITEMS = 'dacell_inventory_v5';
const STORAGE_KEY_SETTINGS = 'dacell_settings_v5';
const STORAGE_KEY_AUTH = 'dacell_auth_token';

function sanitizeStockItem(item: iPhoneItem): iPhoneItem {
  return {
    ...item,
    availableColors: [{ color: item.color, hex: item.colorHex || '#4B5563', imageUrl: item.imageUrl }],
    availableStorages: [item.storage],
  };
}

export default function App() {
  // 1. Estado persistido de itens e configurações
  const [items, setItems] = useState<iPhoneItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(sanitizeStockItem);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_INVENTORY.map(sanitizeStockItem);
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.instagramHandle === '@dacell_garopaba') {
          parsed.instagramHandle = '@dacell.sc';
          localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // 2. Estado de autenticação do Lojista
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });

  const [previewAsCustomer, setPreviewAsCustomer] = useState<boolean>(false);

  // 3. Filtros e busca
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<iPhoneSeries | 'Todas'>('Todas');
  const [selectedCondition, setSelectedCondition] = useState('todas');
  const [selectedStorage, setSelectedStorage] = useState('Todos');
  const [sortBy, setSortBy] = useState('featured');

  // 4. Modais
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<iPhoneItem | null>(null);
  const [isAiImportOpen, setIsAiImportOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<iPhoneItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // 5. Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sincroniza no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    showToast('Acesso de lojista ativado com sucesso!');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setPreviewAsCustomer(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    showToast('Você saiu do modo lojista.');
  };

  // Manipulação de Estoque
  const handleImportComplete = (newItems: iPhoneItem[], mode: 'append' | 'replace') => {
    if (mode === 'replace') {
      setItems(newItems);
      showToast(`Vitrine atualizada! ${newItems.length} novos aparelhos em estoque.`);
    } else {
      setItems((prev) => [...newItems, ...prev]);
      showToast(`Sucesso! ${newItems.length} iPhones adicionados à sua vitrine.`);
    }
  };

  const handleSaveProduct = (itemToSave: iPhoneItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === itemToSave.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = itemToSave;
        return copy;
      }
      return [itemToSave, ...prev];
    });
    showToast('Aparelho salvo na vitrine com sucesso!');
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este iPhone da vitrine?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast('Aparelho removido.');
    }
  };

  const handleToggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isAvailable: !i.isAvailable } : i))
    );
  };

  const handleDuplicateItem = (itemToDup: iPhoneItem) => {
    const newItem: iPhoneItem = {
      ...itemToDup,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    showToast(`Cópia de ${newItem.model} criada.`);
  };

  const handleResetInventory = () => {
    setItems(INITIAL_INVENTORY);
    showToast('Estoque inicial restaurado.');
  };

  // Filtros aplicados
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Regra de ouro solicitada pelo usuário:
      // "para que o cliente que abrir o link veja apenas os modelos disponíveis"
      const isCustomerView = !isAdmin || previewAsCustomer;
      if (isCustomerView && !item.isAvailable) {
        return false;
      }

      // Filtro de Série
      if (selectedSeries !== 'Todas' && item.series !== selectedSeries) {
        return false;
      }

      // Filtro de Condição
      if (selectedCondition === 'lacrado' && !item.condition.toLowerCase().includes('lacrado')) {
        return false;
      }
      if (selectedCondition === 'seminovo' && item.condition.toLowerCase().includes('lacrado')) {
        return false;
      }

      // Filtro de Armazenamento
      if (selectedStorage !== 'Todos' && item.storage !== selectedStorage) {
        return false;
      }

      // Busca por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.model.toLowerCase().includes(q);
        const matchColor = item.color.toLowerCase().includes(q);
        const matchStorage = item.storage.toLowerCase().includes(q);
        const matchNotes = item.notes?.toLowerCase().includes(q);
        if (!matchTitle && !matchColor && !matchStorage && !matchNotes) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'battery-desc') {
        const batA = a.batteryHealth ?? 100;
        const batB = b.batteryHealth ?? 100;
        return batB - batA;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // Destaques: disponíveis primeiro
      if (a.isAvailable !== b.isAvailable) {
        return a.isAvailable ? -1 : 1;
      }
      return 0;
    });
  }, [items, isAdmin, previewAsCustomer, selectedSeries, selectedCondition, selectedStorage, searchQuery, sortBy]);

  const totalAvailable = items.filter((i) => i.isAvailable).length;
  const totalSold = items.filter((i) => !i.isAvailable).length;
  const totalStockValue = items
    .filter((i) => i.isAvailable)
    .reduce((acc, curr) => acc + curr.price, 0);

  const mainWhatsAppUrl = generateGenericWhatsAppLink(settings.whatsappNumber, settings.storeName);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col text-neutral-900 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header com modo Lojista integrado */}
      <Header
        settings={settings}
        isAdmin={isAdmin}
        previewAsCustomer={previewAsCustomer}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={handleAdminLogout}
        onOpenAiImport={() => setIsAiImportOpen(true)}
        onOpenNewProduct={() => {
          setEditingItem(null);
          setIsProductFormOpen(true);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onTogglePreviewCustomer={() => setPreviewAsCustomer(!previewAsCustomer)}
        totalAvailable={totalAvailable}
        totalSold={totalSold}
        totalStockValue={totalStockValue}
      />

      {/* Main Content Area: Vitrine Direta e Clean */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-5">
        {/* Barra de Filtros e Busca */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSeries={selectedSeries}
          onSeriesChange={setSelectedSeries}
          selectedCondition={selectedCondition}
          onConditionChange={setSelectedCondition}
          selectedStorage={selectedStorage}
          onStorageChange={setSelectedStorage}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          totalFiltered={filteredItems.length}
        />

        {/* Lojista Callout Rápido se a vitrine estiver vazia ou com poucos itens */}
        {isAdmin && !previewAsCustomer && items.length === 0 && (
          <div className="p-8 bg-white border border-dashed border-neutral-300 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Sua vitrine ainda não possui iPhones cadastrados</h3>

            <button
              onClick={() => setIsAiImportOpen(true)}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Importar Lista com IA Agora</span>
            </button>
          </div>
        )}

        {/* Grid de iPhones */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                settings={settings}
                isAdmin={isAdmin}
                previewAsCustomer={previewAsCustomer}
                onOpenDetails={(selected) => setSelectedItemForDetails(selected)}
                onEditItem={(selected) => {
                  setEditingItem(selected);
                  setIsProductFormOpen(true);
                }}
                onDeleteItem={handleDeleteItem}
                onToggleAvailability={handleToggleAvailability}
                onDuplicateItem={handleDuplicateItem}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200/80 space-y-3">
            <Smartphone className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-base font-semibold text-neutral-900">Nenhum iPhone encontrado com os filtros selecionados</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Tente selecionar outra série, limpar a busca ou entrar em contato pelo WhatsApp para encomendar o modelo desejado.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedSeries('Todas');
                  setSelectedCondition('todas');
                  setSelectedStorage('Todos');
                  setSearchQuery('');
                }}
                className="px-3.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Limpar Todos os Filtros
              </button>
              <a
                href={mainWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar no WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-neutral-200 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-neutral-900">
              <Smartphone className="w-4 h-4" />
              <span>{settings.storeName}</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {settings.tagline} · {settings.city}
            </p>
          </div>

          <div className="flex items-center gap-4 text-neutral-600">
            {settings.instagramHandle && (
              <a
                href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{settings.instagramHandle}</span>
              </a>
            )}

            <a
              href={mainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp de Vendas</span>
            </a>

            {!isAdmin ? (
              <button
                onClick={() => setIsAdminLoginOpen(true)}
                className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                title="Acesso Lojista"
              >
                <Lock className="w-3 h-3" />
                <span>Painel</span>
              </button>
            ) : (
              <button
                onClick={handleAdminLogout}
                className="text-neutral-400 hover:text-rose-600 transition-colors"
              >
                Sair do Modo Lojista
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Modais do Sistema */}
      <ProductModal
        item={selectedItemForDetails}
        settings={settings}
        allStockItems={items}
        onClose={() => setSelectedItemForDetails(null)}
        onSelectItem={(it) => setSelectedItemForDetails(it)}
      />

      <AiImportModal
        isOpen={isAiImportOpen}
        onClose={() => setIsAiImportOpen(false)}
        onImportComplete={handleImportComplete}
      />

      <ProductFormModal
        isOpen={isProductFormOpen}
        initialItem={editingItem}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveProduct}
      />

      <StoreSettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(newSettings) => {
          setSettings(newSettings);
          showToast('Configurações da loja salvas com sucesso!');
        }}
        onResetInventory={handleResetInventory}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        expectedPin={settings.adminPin}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}
