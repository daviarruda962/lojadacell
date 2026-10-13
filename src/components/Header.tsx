import React from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Plus, 
  Settings, 
  LogOut, 
  Lock, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Layers
} from 'lucide-react';
import { StoreSettings } from '../types/iphone';
import { generateGenericWhatsAppLink } from '../utils/formatters';

interface HeaderProps {
  settings: StoreSettings;
  isAdmin: boolean;
  previewAsCustomer: boolean;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onOpenAiImport: () => void;
  onOpenNewProduct: () => void;
  onOpenSettings: () => void;
  onTogglePreviewCustomer: () => void;
  totalAvailable: number;
  totalSold: number;
  totalStockValue: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isAdmin,
  previewAsCustomer,
  onOpenAdminLogin,
  onLogoutAdmin,
  onOpenAiImport,
  onOpenNewProduct,
  onOpenSettings,
  onTogglePreviewCustomer,
  totalAvailable,
  totalSold,
}) => {
  const whatsappUrl = generateGenericWhatsAppLink(settings.whatsappNumber, settings.storeName);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top Banner Lojista (visível apenas para o dono da loja autenticado) */}
      {isAdmin && (
        <div className="bg-neutral-900 text-white text-xs px-4 py-2 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wide uppercase text-neutral-300 text-[11px]">
                Painel do Lojista
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300">
                {totalAvailable} disponíveis {totalSold > 0 ? `· ${totalSold} vendidos` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onTogglePreviewCustomer}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                  previewAsCustomer
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white'
                }`}
                title="Alternar entre ver modo lojista ou visão exata do cliente"
              >
                {previewAsCustomer ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{previewAsCustomer ? 'Vendo como Cliente' : 'Visão Lojista'}</span>
              </button>

              <button
                onClick={onOpenAiImport}
                className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded font-medium shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Importar Lista com IA</span>
              </button>

              <button
                onClick={onOpenNewProduct}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo iPhone</span>
              </button>

              <button
                onClick={onOpenSettings}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
                title="Configurações da Loja"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onLogoutAdmin}
                className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                title="Sair do Modo Lojista"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Store Details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm">
            <Smartphone className="w-5 h-5 text-neutral-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                {settings.storeName}
              </h1>
              <span title="Vitrine Oficial Verificada">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-normal">
              <span className="hidden sm:inline">{settings.tagline}</span>
              <span className="hidden sm:inline text-neutral-300">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                {settings.city}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct WhatsApp Callout for customer */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden md:inline">Falar no WhatsApp</span>
            <span className="md:hidden">WhatsApp</span>
          </a>

          {/* Admin Access / Login Trigger */}
          {!isAdmin ? (
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 text-xs sm:text-sm font-medium transition-colors"
              title="Acesso restrito para o administrador gerenciar a vitrine"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Acesso Lojista</span>
            </button>
          ) : (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 font-medium">
              <Layers className="w-3.5 h-3.5 text-neutral-500" />
              <span>Estoque Ativo</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
