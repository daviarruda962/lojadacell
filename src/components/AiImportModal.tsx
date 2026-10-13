import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Edit2, 
  Plus, 
  CheckCircle2, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { iPhoneItem, ParsedItemCandidate } from '../types/iphone';
import { matchIPhoneImage, detectSeries, getHexForColor, normalizeModelName, IPHONE_CATALOG } from '../data/catalog';
import { formatCurrency } from '../utils/formatters';

interface AiImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (items: iPhoneItem[], mode: 'append' | 'replace') => void;
}

const SAMPLE_LIST_1 = `ESTOQUE DACELL GAROPABA 📲
16 Pro Max 256GB Titânio Deserto Lacrado - R$ 7.890
16 Plus 128GB Ultramarino Lacrado - R$ 5.790
16e 128GB Preto Lacrado - R$ 4.590
15 Pro Max 256GB Titânio Azul 96% bateria - R$ 5.490
15 Plus 128GB Rosa 95% bateria - R$ 4.290
14 Pro Max 128GB Roxo Profundo 89% bateria - R$ 4.190
14 Plus 128GB Estelar 91% bateria - R$ 3.390
13 128GB Meia-noite 88% bateria - R$ 2.590
12 64GB Azul 86% bateria - R$ 1.890
11 64GB Branco 85% bateria - R$ 1.490
XR 64GB Preto 84% bateria - R$ 1.190
XS Max 64GB Dourado 83% bateria - R$ 1.390`;

const SAMPLE_LIST_2 = `Novos recebidos hoje:
- 17 Air 256GB Prateado Slim Lacrado - R$ 7.200
- 16 pro 128 titânio natural lacrado - R$ 6.790
- 15 128 azul 94% bateria - R$ 3.790
- 13 mini 128 meia noite 87% bateria - R$ 2.390`;

export const AiImportModal: React.FC<AiImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  if (!isOpen) return null;

  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [parsedCandidates, setParsedCandidates] = useState<ParsedItemCandidate[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [aiSource, setAiSource] = useState<string>('');

  const handleParse = async () => {
    if (!rawText.trim()) {
      setErrorMsg('Por favor, cole sua lista de iPhones no campo acima.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/parse-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao processar lista com IA');
      }

      const items: ParsedItemCandidate[] = data.items || [];
      if (items.length === 0) {
        setErrorMsg('Nenhum iPhone foi reconhecido no texto informado. Verifique os modelos e tente novamente.');
        setLoading(false);
        return;
      }

      setParsedCandidates(items);
      setSelectedIndices(new Set(items.map((_, idx) => idx)));
      setAiSource(data.source === 'gemini' ? 'Gemini 3.8 Flash' : 'Motor Inteligente');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Erro de comunicação ao processar lista.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectIndex = (idx: number) => {
    const next = new Set(selectedIndices);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setSelectedIndices(next);
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    setParsedCandidates(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], price: newPrice };
      return copy;
    });
  };

  const handleConfirmImport = () => {
    const chosen = parsedCandidates.filter((_, idx) => selectedIndices.has(idx));
    if (chosen.length === 0) {
      setErrorMsg('Selecione pelo menos um aparelho para subir na vitrine.');
      return;
    }

    // Converte os candidatos para iPhoneItem completo com fotos oficiais de marketplace em fundo branco
    const finalItems: iPhoneItem[] = chosen.map((c, i) => {
      const { imageUrl, hex } = matchIPhoneImage(c.model, c.color);
      const series = detectSeries(c.model);
      const catalogEntry = IPHONE_CATALOG[normalizeModelName(c.model)];

      return {
        id: `imported-${Date.now()}-${i}`,
        model: c.model,
        series,
        storage: c.storage || '128GB',
        availableStorages: [c.storage || '128GB'],
        color: c.color || 'Preto',
        colorHex: hex || getHexForColor(c.color),
        availableColors: [{ color: c.color || 'Preto', hex: hex || getHexForColor(c.color), imageUrl }],
        price: Number(c.price) || 3000,
        originalPrice: c.originalPrice ? Number(c.originalPrice) : Math.round((Number(c.price) || 3000) * 1.15),
        batteryHealth: c.batteryHealth ?? null,
        condition: c.condition || 'Seminovo Impecável',
        isAvailable: true,
        notes: c.notes || 'Aparelho revisado e testado.',
        imageUrl,
        createdAt: new Date().toISOString(),
      };
    });

    onImportComplete(finalItems, importMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Importar Lista de Estoque com IA</h3>
              <p className="text-xs text-neutral-400">
                A inteligência artificial identifica modelos, cores, saúde da bateria e preços automaticamente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {parsedCandidates.length === 0 ? (
            /* Step 1: Input text */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Cole o texto ou lista de fornecedor / WhatsApp
                </label>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder={`Exemplo:\n15 pro 128gb azul 92% bateria - 4.850\n16 lacrado 128 rosa 1 ano gar - 5.200\n14 pro max 256 roxo 88% compl - 4.100\n13 128 preto 89% - 2.500`}
                  className="w-full p-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 font-mono focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>

              {/* Sample loader buttons */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-500 font-medium">Testar com exemplos rápidos:</span>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_LIST_1)}
                  className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors border border-neutral-200"
                >
                  Exemplo 1: Lista Completa (10 iPhones)
                </button>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_LIST_2)}
                  className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors border border-neutral-200"
                >
                  Exemplo 2: Novos Recebidos (4 iPhones)
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* How it works info */}
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5 text-blue-950">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Como a IA trabalha:</span>
                </div>
                <p className="text-blue-800 leading-relaxed">
                  1. Reconhece o modelo oficial Apple (iPhone 11 ao 16 Pro Max).<br />
                  2. Associa instantaneamente as <strong>fotos oficiais em fundo branco padrão de marketplace</strong> (Mercado Livre / Apple Store).<br />
                  3. Extrai capacidade (128GB, 256GB), cor, saúde da bateria e valor em Reais.<br />
                  4. Você pode revisar e ajustar qualquer item antes de subir para a vitrine.
                </p>
              </div>
            </div>
          ) : (
            /* Step 2: Review parsed iPhones */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-200">
                <div>
                  <span className="text-xs font-semibold text-neutral-900">
                    {parsedCandidates.length} modelos identificados com {aiSource || 'IA'}
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Fotos de estúdio em fundo branco já vinculadas. Desmarque os que não quiser ou ajuste os preços:
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setSelectedIndices(new Set(parsedCandidates.map((_, i) => i)))}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Marcar Todos
                  </button>
                  <span className="text-neutral-300">·</span>
                  <button
                    onClick={() => setSelectedIndices(new Set())}
                    className="text-neutral-500 hover:underline font-medium"
                  >
                    Desmarcar Todos
                  </button>
                </div>
              </div>

              {/* Table / Cards of extracted items */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {parsedCandidates.map((item, idx) => {
                  const isChecked = selectedIndices.has(idx);
                  const { imageUrl, hex } = matchIPhoneImage(item.model, item.color);

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-white border-neutral-300 shadow-xs' 
                          : 'bg-neutral-50/60 border-neutral-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectIndex(idx)}
                          className="w-4 h-4 rounded text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                        />

                        {/* Marketplace White Background Photo Thumbnail 1:1 */}
                        <div className="w-12 h-12 bg-white border border-neutral-100 rounded-lg p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={item.model}
                            className="w-full h-full object-contain transform scale-125"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-neutral-900">
                              {item.model}
                            </h4>
                            <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded">
                              {item.storage}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <span 
                                className="w-2.5 h-2.5 rounded-full border border-neutral-300 shrink-0" 
                                style={{ backgroundColor: hex || getHexForColor(item.color) }}
                              />
                              {item.color}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className={item.condition === 'Lacrado' ? 'text-blue-600 font-semibold' : 'text-neutral-700'}>
                              {item.condition}
                            </span>
                            {item.batteryHealth && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-emerald-700 font-medium">
                                  🔋 {item.batteryHealth}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price editor field */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-xs text-neutral-500">Preço R$:</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handlePriceChange(idx, Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-neutral-50 border border-neutral-300 rounded-md text-xs font-bold text-neutral-900 text-right focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Import Mode: Append or Replace */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-neutral-800">Modo de envio para a vitrine:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="text-neutral-900"
                    />
                    <span className="text-neutral-700">Adicionar ao estoque existente</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="text-neutral-900"
                    />
                    <span className="text-neutral-700">Substituir vitrine inteira</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          {parsedCandidates.length === 0 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleParse}
                disabled={loading || !rawText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Identificando modelos com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Identificar e Subir com IA</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setParsedCandidates([])}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                ← Voltar e colar outro texto
              </button>

              <button
                type="button"
                onClick={handleConfirmImport}
                disabled={selectedIndices.size === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                <Check className="w-4 h-4" />
                <span>
                  Publicar na Vitrine ({selectedIndices.size} iPhones)
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
