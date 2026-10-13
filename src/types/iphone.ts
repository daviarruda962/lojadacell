export type iPhoneSeries =
  | 'iPhone 18'
  | 'iPhone 17'
  | 'iPhone 16'
  | 'iPhone 15'
  | 'iPhone 14'
  | 'iPhone 13'
  | 'iPhone 12'
  | 'iPhone 11'
  | 'iPhone X / XS / XR'
  | 'Outros';

export type Condition = 'Lacrado' | 'Seminovo Impecável' | 'Excelente' | 'Muito Bom';

export interface ColorOption {
  color: string;
  hex: string;
  imageUrl?: string;
}

export interface iPhoneItem {
  id: string;
  model: string;              // Ex: "iPhone 15 Pro Max"
  series: iPhoneSeries;       // Ex: "iPhone 15"
  storage: string;            // Ex: "256GB"
  availableStorages?: string[]; // Ex: ["128GB", "256GB", "512GB"]
  color: string;              // Ex: "Titânio Natural"
  colorHex?: string;          // Ex: "#C5C5BF"
  availableColors?: ColorOption[]; // Cores disponíveis
  price: number;              // Ex: 5990 (R$)
  originalPrice?: number;     // Ex: 6990 (R$)
  batteryHealth?: number | null; // Ex: 94 (null se lacrado)
  condition: Condition;       // Ex: "Seminovo Impecável"
  isAvailable: boolean;       // Disponível ou Vendido
  notes?: string;             // Ex: "Acompanha caixa original, cabo e película"
  imageUrl: string;           // Foto padrão fundo branco marketplace Mercado Livre
  galleryImages?: string[];   // Outros ângulos fundo branco
  imeiOrSerial?: string;      // Opcional para controle do lojista
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string;     // Ex: "5548999999999" (somente números)
  instagramHandle: string;    // Ex: "@dacell_garopaba"
  city: string;               // "Garopaba - SC"
  deliveryInfo: string;       // Ex: "Retirada em Garopaba - SC ou envio seguro"
  pixDiscountPercent: number; // Ex: 5%
  maxCardInstallments: number;// 18
  adminPin: string;           // Ex: "1234"
}

export interface ParsedItemCandidate {
  model: string;
  series: iPhoneSeries;
  storage: string;
  color: string;
  price: number;
  originalPrice?: number;
  batteryHealth?: number | null;
  condition: Condition;
  notes?: string;
}
