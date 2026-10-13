import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { iPhoneItem, Condition, iPhoneSeries } from '../types/iphone';
import { IPHONE_CATALOG, matchIPhoneImage, detectSeries, getHexForColor, normalizeModelName } from '../data/catalog';

interface ProductFormModalProps {
  isOpen: boolean;
  initialItem?: iPhoneItem | null;
  onClose: () => void;
  onSave: (item: iPhoneItem) => void;
}

const MODELS = [
  'iPhone 18 Pro Max',
  'iPhone 18 Pro',
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17 Air',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16e',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro',
  'iPhone 13',
  'iPhone 13 mini',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro',
  'iPhone 12',
  'iPhone 12 mini',
  'iPhone 11 Pro Max',
  'iPhone 11 Pro',
  'iPhone 11',
  'iPhone XS Max',
  'iPhone XS',
  'iPhone XR',
  'iPhone X',
];

const STORAGES = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const CONDITIONS: Condition[] = ['Lacrado', 'Seminovo Impecável', 'Excelente', 'Muito Bom'];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  initialItem,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(initialItem);

  const [model, setModel] = useState(initialItem?.model || 'iPhone 15 Pro');
  const [storage, setStorage] = useState(initialItem?.storage || '128GB');
  const [color, setColor] = useState(initialItem?.color || 'Titânio Natural');
  const [colorHex, setColorHex] = useState(initialItem?.colorHex || '#B8AF9F');
  const [price, setPrice] = useState(initialItem?.price || 4800);
  const [originalPrice, setOriginalPrice] = useState(initialItem?.originalPrice || 5400);
  const [condition, setCondition] = useState<Condition>(initialItem?.condition || 'Seminovo Impecável');
  const [batteryHealth, setBatteryHealth] = useState<number | ''>(
    initialItem?.batteryHealth !== undefined && initialItem?.batteryHealth !== null ? initialItem.batteryHealth : 92
  );
  const [notes, setNotes] = useState(initialItem?.notes || 'Acompanha cabo original e película aplicada.');
  const [imageUrl, setImageUrl] = useState(initialItem?.imageUrl || '');
  const [isAvailable, setIsAvailable] = useState(initialItem?.isAvailable ?? true);

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const catalogEntry = IPHONE_CATALOG[normalizeModelName(newModel)];
    if (catalogEntry) {
      if (catalogEntry.availableStorages.length > 0 && !catalogEntry.availableStorages.includes(storage)) {
        setStorage(catalogEntry.availableStorages[0]);
      }
      if (catalogEntry.colors.length > 0) {
        const defaultColor = catalogEntry.colors[0];
        setColor(defaultColor.color);
        setColorHex(defaultColor.hex);
        setImageUrl(defaultColor.imageUrl || '');
      }
    } else {
      const matched = matchIPhoneImage(newModel, color);
      setImageUrl(matched.imageUrl);
      setColorHex(matched.hex);
    }
  };

  const handleColorSelect = (newColor: string, hex?: string, img?: string) => {
    setColor(newColor);
    const resolvedHex = hex || getHexForColor(newColor);
    setColorHex(resolvedHex);
    if (img) {
      setImageUrl(img);
    } else {
      const matched = matchIPhoneImage(model, newColor);
      setImageUrl(matched.imageUrl);
    }
  };

  useEffect(() => {
    if (!initialItem && !imageUrl) {
      const matched = matchIPhoneImage(model, color);
      setImageUrl(matched.imageUrl);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isLacrado = condition.toLowerCase().includes('lacrado');
    const series = detectSeries(model);
    const finalHex = colorHex || getHexForColor(color);
    const finalImage = imageUrl.trim() || matchIPhoneImage(model, color).imageUrl;
    const catalogEntry = IPHONE_CATALOG[normalizeModelName(model)];

    const item: iPhoneItem = {
      id: initialItem?.id || `item-${Date.now()}`,
      model,
      series,
      storage,
      availableStorages: [storage],
      color,
      colorHex: finalHex,
      availableColors: [{ color, hex: finalHex, imageUrl: finalImage }],
      price: Number(price) || 0,
      originalPrice: Number(originalPrice) || 0,
      batteryHealth: isLacrado ? null : (batteryHealth === '' ? null : Number(batteryHealth)),
      condition,
      isAvailable,
      notes,
      imageUrl: finalImage,
      createdAt: initialItem?.createdAt || new Date().toISOString(),
    };

    onSave(item);
    onClose();
  };

  const currentEntry = IPHONE_CATALOG[normalizeModelName(model)];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">
              {isEditing ? 'Editar iPhone na Vitrine' : 'Adicionar Novo iPhone Manualmente'}
            </h3>
            <p className="text-xs text-neutral-400">
              Fotos com fundo branco padrão Mercado Livre são aplicadas automaticamente
            </p>
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
          {/* Modelo & Capacidade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Modelo do iPhone *</label>
              <select
                value={model}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:ring-1 focus:ring-neutral-900"
              >
                {MODELS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Armazenamento Correspondente *</label>
              <div className="flex gap-1 flex-wrap">
                {(currentEntry?.availableStorages || STORAGES).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStorage(s)}
                    className={`flex-1 min-w-[50px] py-2 text-xs font-medium rounded-lg border transition-colors ${
                      storage === s
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cores Oficiais */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5">
              Cor Oficial ({color})
            </label>
            {currentEntry?.colors && (
              <div className="flex flex-wrap gap-2 mb-2">
                {currentEntry.colors.map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => handleColorSelect(c.color, c.hex, c.imageUrl)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      color === c.color
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-neutral-300 shrink-0" 
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.color}</span>
                  </button>
                ))}
              </div>
            )}
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Ou digite o nome da cor personalizada..."
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
            />
          </div>

          {/* Condição & Saúde da Bateria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Condição do Aparelho *</label>
              <select
                value={condition}
                onChange={(e) => {
                  const cond = e.target.value as Condition;
                  setCondition(cond);
                  if (cond === 'Lacrado') {
                    setBatteryHealth('');
                  }
                }}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
              >
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Saúde da Bateria % (deixe em branco se for lacrado)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder={condition === 'Lacrado' ? '100% (Lacrado)' : 'Ex: 92'}
                disabled={condition === 'Lacrado'}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs disabled:opacity-50"
              />
            </div>
          </div>

          {/* Preço & Preço Comparativo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Preço no PIX (R$) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  const p = Number(e.target.value);
                  setPrice(p);
                  if (!originalPrice || originalPrice <= p) {
                    setOriginalPrice(Math.round(p * 1.15));
                  }
                }}
                required
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-bold text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Preço de Referência / De (R$)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
              />
            </div>
          </div>

          {/* Imagem Padrão Marketplace */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-neutral-700">Foto do Produto (Fundo Branco Estúdio)</label>
              <button
                type="button"
                onClick={() => {
                  const m = matchIPhoneImage(model, color);
                  setImageUrl(m.imageUrl);
                }}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Restaurar foto padrão de estúdio</span>
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... URL da imagem"
                className="flex-1 p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
              />
              {imageUrl && (
                <div className="w-10 h-10 bg-white border border-neutral-200 rounded-lg p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={imageUrl} alt="preview" className="w-full h-full object-contain transform scale-125" />
                </div>
              )}
            </div>
          </div>

          {/* Status de Disponibilidade */}
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Status de Disponibilidade</label>
            <div className="flex gap-2 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="avail"
                  checked={isAvailable}
                  onChange={() => setIsAvailable(true)}
                />
                <span>Disponível para venda</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer ml-2">
                <input
                  type="radio"
                  name="avail"
                  checked={!isAvailable}
                  onChange={() => setIsAvailable(false)}
                />
                <span>Vendido</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Acessórios inclusos e notas</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Acompanha cabo original e película aplicada."
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs"
            />
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
              <span>{isEditing ? 'Salvar Alterações' : 'Adicionar à Vitrine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
