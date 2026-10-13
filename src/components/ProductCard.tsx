import React, { useState } from 'react';
import { 
  MessageCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Copy 
} from 'lucide-react';
import { iPhoneItem, StoreSettings } from '../types/iphone';
import { formatCurrency, formatInstallments, generateWhatsAppLink } from '../utils/formatters';

interface ProductCardProps {
  item: iPhoneItem;
  settings: StoreSettings;
  isAdmin: boolean;
  previewAsCustomer: boolean;
  onOpenDetails: (item: iPhoneItem) => void;
  onEditItem?: (item: iPhoneItem) => void;
  onDeleteItem?: (id: string) => void;
  onToggleAvailability?: (id: string) => void;
  onDuplicateItem?: (item: iPhoneItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  settings,
  isAdmin,
  previewAsCustomer,
  onOpenDetails,
  onEditItem,
  onDeleteItem,
  onToggleAvailability,
  onDuplicateItem,
}) => {
  const [imgError, setImgError] = useState(false);

  const showAdminControls = isAdmin && !previewAsCustomer;
  const isSold = !item.isAvailable;

  const whatsappUrl = generateWhatsAppLink(
    settings.whatsappNumber,
    item.model,
    item.storage,
    item.color,
    item.price,
    item.batteryHealth,
    item.condition
  );

  const fallbackUrl = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha';
  const displayImage = imgError ? fallbackUrl : (item.imageUrl || fallbackUrl);

  return (
    <div 
      className={`group relative bg-white rounded-xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden ${
        isSold ? 'opacity-75 grayscale-20' : ''
      }`}
    >
      {/* Container de Foto: Fundo Branco Puro Oficial 1:1 (Preenchimento proporcional sem aspecto horizontal estreito) */}
      <div 
        onClick={() => onOpenDetails(item)}
        className="relative w-full aspect-square bg-white flex items-center justify-center p-2.5 sm:p-3 cursor-pointer overflow-hidden border-b border-neutral-100"
      >
        <img
          src={displayImage}
          alt={`${item.model} ${item.storage} ${item.color}`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center scale-125 transition-transform duration-300 select-none"
          loading="lazy"
        />

        {/* Overlay se estiver marcado como vendido */}
        {isSold && (
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              Vendido
            </span>
          </div>
        )}

        {/* Hover sutil de ver fotos */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/80 hover:bg-neutral-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
          <Eye className="w-3 h-3" />
          <span>Ver Detalhes</span>
        </div>
      </div>

      {/* Info & Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Metadata Exato em estoque deste anúncio: Armazenamento, Cor e Bateria */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
              {item.storage}
            </span>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-700 font-medium text-xs">
              <span 
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0" 
                style={{ backgroundColor: item.colorHex || '#4B5563' }}
              />
              <span>{item.color}</span>
            </span>
            {item.batteryHealth && (
              <>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span className="text-neutral-500 text-xs">Bateria {item.batteryHealth}%</span>
              </>
            )}
          </div>

          {/* Model Title */}
          <h3 
            onClick={() => onOpenDetails(item)}
            className="text-base font-semibold text-neutral-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer"
          >
            {item.model}
          </h3>

          {/* Price Block */}
          <div className="pt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-neutral-900">
                {formatCurrency(item.price)}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                à vista
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              ou {formatInstallments(item.price, settings.maxCardInstallments)}
            </p>
          </div>
        </div>

        {/* Action Button & Admin Tools */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          {!isSold ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Entrar em Contato · WhatsApp</span>
            </a>
          ) : (
            <button
              disabled
              className="w-full py-2.5 px-3 bg-neutral-100 text-neutral-400 text-xs font-medium rounded-lg cursor-not-allowed text-center"
            >
              Indisponível no momento
            </button>
          )}

          {/* Admin Management Toolbar */}
          {showAdminControls && (
            <div className="flex items-center justify-between pt-2 text-xs border-t border-neutral-100">
              <button
                onClick={() => onToggleAvailability?.(item.id)}
                className={`text-[11px] font-medium transition-colors ${
                  item.isAvailable ? 'text-emerald-700 hover:text-emerald-800' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {item.isAvailable ? '✓ Disponível' : '✕ Marcar Disponível'}
              </button>

              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={() => onDuplicateItem?.(item)}
                  className="p-1 hover:text-neutral-800 transition-colors"
                  title="Duplicar este aparelho"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onEditItem?.(item)}
                  className="p-1 hover:text-neutral-800 transition-colors"
                  title="Editar dados"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteItem?.(item.id)}
                  className="p-1 hover:text-rose-600 transition-colors"
                  title="Excluir do catálogo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
