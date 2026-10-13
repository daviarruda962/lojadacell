import React, { useState } from 'react';
import { X, Check, Store, Phone, Shield, RefreshCw } from 'lucide-react';
import { StoreSettings } from '../types/iphone';

interface StoreSettingsModalProps {
  isOpen: boolean;
  settings: StoreSettings;
  onClose: () => void;
  onSave: (newSettings: StoreSettings) => void;
  onResetInventory: () => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
  onResetInventory,
}) => {
  if (!isOpen) return null;

  const [form, setForm] = useState<StoreSettings>({ ...settings });
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-neutral-300" />
            <div>
              <h3 className="text-base font-bold">Configurações da Loja</h3>
              <p className="text-xs text-neutral-400">Personalize o contato do WhatsApp, dados da loja e senha</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Nome da Loja *</label>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              required
              className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-medium focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Slogan / Descrição Curta</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                WhatsApp de Vendas (com DDD) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="Ex: 5511999998888"
                  required
                  className="w-full p-2.5 pl-8 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono"
                />
                <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-3" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                O cliente clicará em "Tenho Interesse" e abrirá este número diretamente.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Cidade / Região</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Ex: São Paulo, SP"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Instagram (@)</label>
              <input
                type="text"
                value={form.instagramHandle}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                placeholder="@sualoja"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                PIN de Acesso Lojista (Senha)
              </label>
              <input
                type="text"
                value={form.adminPin}
                onChange={(e) => setForm({ ...form, adminPin: e.target.value })}
                placeholder="1234"
                required
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Informações de Entrega e Envio
            </label>
            <input
              type="text"
              value={form.deliveryInfo}
              onChange={(e) => setForm({ ...form, deliveryInfo: e.target.value })}
              className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
            />
          </div>

          {/* Reset button zone */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-800">Restaurar Estoque Demo</span>
                <p className="text-[11px] text-neutral-500">
                  Volta a lista inicial de iPhones com fotos oficiais de marketplace.
                </p>
              </div>
              {!resetConfirm ? (
                <button
                  type="button"
                  onClick={() => setResetConfirm(true)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium transition-colors"
                >
                  Restaurar
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onResetInventory();
                      setResetConfirm(false);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetConfirm(false)}
                    className="px-2 py-1 text-neutral-500 hover:text-neutral-800"
                  >
                    Não
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Configurações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
