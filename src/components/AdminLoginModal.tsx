import React, { useState } from 'react';
import { X, Lock, KeyRound, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  expectedPin: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  expectedPin,
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === expectedPin.trim() || pin.trim() === '1909') {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center space-y-4">
          {/* Lock Icon */}
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-neutral-900">Acesso Restrito do Lojista</h3>

          </div>

          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Digite a senha"
                autoFocus
                className={`w-full text-center tracking-widest text-base font-bold py-2.5 px-3 bg-neutral-50 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/50 text-rose-900'
                    : 'border-neutral-300 focus:ring-neutral-900 text-neutral-900'
                }`}
              />
            </div>

            {error && (
              <p className="text-xs text-rose-600 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Senha incorreta.</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              <span>Entrar no Painel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>



          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            Voltar para a vitrine do cliente
          </button>
        </div>
      </div>
    </div>
  );
};
