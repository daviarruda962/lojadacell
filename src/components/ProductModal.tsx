import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Battery, 
  CreditCard, 
  Cpu, 
  Zap, 
  Share2
} from 'lucide-react';
import { iPhoneItem, StoreSettings } from '../types/iphone';
import { formatCurrency, formatInstallments, generateWhatsAppLink } from '../utils/formatters';
import { IPHONE_CATALOG, normalizeModelName } from '../data/catalog';

interface ProductModalProps {
  item: iPhoneItem | null;
  settings: StoreSettings;
  allStockItems?: iPhoneItem[];
  onClose: () => void;
  onSelectItem?: (item: iPhoneItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  item, 
  settings, 
  allStockItems = [],
  onClose,
  onSelectItem 
}) => {
  if (!item) return null;

  const norm = normalizeModelName(item.model);
  const catalogEntry = IPHONE_CATALOG[norm];

  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Outras unidades REAIS em estoque deste mesmo modelo
  const otherStockUnits = allStockItems.filter(
    (i) => i.isAvailable && i.id !== item.id && normalizeModelName(i.model) === norm
  );

  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    item.model,
    item.storage,
    item.color,
    item.price,
    item.batteryHealth,
    item.condition
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const fallbackUrl = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha';
  const displayImage = imgError ? fallbackUrl : (item.imageUrl || fallbackUrl);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col md:flex-row my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Foto Oficial Marketplace 1:1 */}
        <div className="w-full md:w-1/2 bg-white p-5 sm:p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-neutral-100">
          <div className="relative w-full aspect-square bg-white rounded-xl border border-neutral-100 flex items-center justify-center p-3 overflow-hidden">
            <img
              src={displayImage}
              alt={`${item.model} ${item.storage} ${item.color}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover scale-125 transition-transform duration-300 select-none"
            />
          </div>

          {/* Color & Storage Display */}
          <div className="w-full mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1.5">
              <span 
                className="w-3.5 h-3.5 rounded-full border border-neutral-300" 
                style={{ backgroundColor: item.colorHex || '#4B5563' }}
              />
              <span className="font-medium text-neutral-800">{item.color}</span>
            </div>
            <span className="font-semibold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
              {item.storage}
            </span>
          </div>
        </div>

        {/* Right Column: Detalhes, Preço & Contato WhatsApp */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Header info sem badges */}
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>{item.series}</span>
                <span aria-hidden="true">·</span>
                <span>{item.storage}</span>
                {item.batteryHealth && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Bateria {item.batteryHealth}%</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
                {item.model}
              </h2>
            </div>

            {/* Apenas Cor e Armazenamento REAIS em Estoque */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-2">
                <span 
                  className="w-4 h-4 rounded-full border border-neutral-300 shrink-0 shadow-xs" 
                  style={{ backgroundColor: item.colorHex || '#4B5563' }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Cor em Estoque</span>
                  <span className="text-xs font-semibold text-neutral-900 truncate block">{item.color}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Capacidade</span>
                  <span className="text-xs font-semibold text-neutral-900 block">{item.storage}</span>
                </div>
              </div>
            </div>

            {/* Outras Unidades REAIS em Estoque deste mesmo modelo (se houver) */}
            {otherStockUnits.length > 0 && (
              <div className="pt-1 space-y-1.5">
                <span className="text-[11px] font-semibold text-neutral-600 block">
                  Outras opções deste modelo em estoque:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {otherStockUnits.map((other) => (
                    <button
                      key={other.id}
                      type="button"
                      onClick={() => onSelectItem?.(other)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-xs transition-all shadow-2xs"
                    >
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0" 
                        style={{ backgroundColor: other.colorHex || '#4B5563' }}
                      />
                      <span className="font-medium text-neutral-800">{other.color}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="text-neutral-600 font-semibold">{other.storage}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="text-emerald-700 font-semibold">{formatCurrency(other.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Section */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-neutral-900">
                  {formatCurrency(item.price)}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  à vista
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                <span>ou {formatInstallments(item.price, settings.maxCardInstallments)}</span>
              </p>
            </div>

            {/* Detalhes do Aparelho */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Especificações Técnicas
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {item.batteryHealth && (
                  <div className="p-2.5 bg-neutral-50/80 rounded-lg border border-neutral-100">
                    <div className="flex items-center gap-1 text-neutral-500 mb-0.5">
                      <Battery className="w-3.5 h-3.5" />
                      <span>Saúde da Bateria</span>
                    </div>
                    <span className="font-semibold text-neutral-800">
                      {item.batteryHealth}%
                    </span>
                  </div>
                )}

                {catalogEntry && (
                  <>
                    <div className="p-2.5 bg-neutral-50/80 rounded-lg border border-neutral-100">
                      <div className="flex items-center gap-1 text-neutral-500 mb-0.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Processador</span>
                      </div>
                      <span className="font-semibold text-neutral-800 truncate block">
                        {catalogEntry.chip}
                      </span>
                    </div>

                    <div className="p-2.5 bg-neutral-50/80 rounded-lg border border-neutral-100 col-span-2">
                      <div className="flex items-center gap-1 text-neutral-500 mb-0.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Tela & Conector</span>
                      </div>
                      <span className="font-semibold text-neutral-800">
                        {catalogEntry.screen} · {catalogEntry.connector}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Observações do aparelho */}
            {item.notes && (
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs text-neutral-600">
                <span className="font-medium text-neutral-800 block mb-0.5">Observações:</span>
                <p className="leading-relaxed">{item.notes}</p>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-neutral-100 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link copiado!' : 'Compartilhar'}</span>
              </button>

              <span>{settings.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
