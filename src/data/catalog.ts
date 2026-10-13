import { iPhoneItem, iPhoneSeries, StoreSettings, ColorOption } from '../types/iphone';

export interface ModelCatalogEntry {
  model: string;
  series: iPhoneSeries;
  availableStorages: string[];
  colors: ColorOption[];
  screen: string;
  chip: string;
  camera: string;
  connector: string;
}

// Fotos oficiais de estúdio da Apple com fundo branco puro (Padrão Oficial Mercado Livre / Magazine Luiza)
export const IPHONE_CATALOG: Record<string, ModelCatalogEntry> = {
  // Linha 18
  'iPhone 18 Pro Max': {
    model: 'iPhone 18 Pro Max',
    series: 'iPhone 18',
    availableStorages: ['256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Preto', hex: '#2B2B2E', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Natural', hex: '#C2BCB3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.9" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A20 Pro',
    camera: 'Tripla 48MP Pro Fusion',
    connector: 'USB-C'
  },
  'iPhone 18 Pro': {
    model: 'iPhone 18 Pro',
    series: 'iPhone 18',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Preto', hex: '#2B2B2E', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Natural', hex: '#C2BCB3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.3" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A20 Pro',
    camera: 'Tripla 48MP Pro Fusion',
    connector: 'USB-C'
  },

  // Linha 17 (17 Air, Pro, Pro Max)
  'iPhone 17 Pro Max': {
    model: 'iPhone 17 Pro Max',
    series: 'iPhone 17',
    availableStorages: ['256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Natural', hex: '#C5BCB1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Deserto', hex: '#C5A898', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.9" Super Retina XDR OLED',
    chip: 'A19 Pro',
    camera: 'Tripla 48MP',
    connector: 'USB-C'
  },
  'iPhone 17 Pro': {
    model: 'iPhone 17 Pro',
    series: 'iPhone 17',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Natural', hex: '#C5BCB1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Preto', hex: '#373639', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.3" Super Retina XDR OLED',
    chip: 'A19 Pro',
    camera: 'Tripla 48MP',
    connector: 'USB-C'
  },
  'iPhone 17 Air': {
    model: 'iPhone 17 Air',
    series: 'iPhone 17',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Branco Slim', hex: '#F5F5F7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto Slim', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.6" Super Retina XDR OLED Ultra-Fino',
    chip: 'A19 Bionic',
    camera: '48MP Fusion Ultra-Leve',
    connector: 'USB-C'
  },
  'iPhone 17': {
    model: 'iPhone 17',
    series: 'iPhone 17',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Preto', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F3F4F6', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A19',
    camera: 'Dupla 48MP',
    connector: 'USB-C'
  },

  // Linha 16 (16 Pro Max, 16 Pro, 16 Plus, 16, 16e)
  'iPhone 16 Pro Max': {
    model: 'iPhone 16 Pro Max',
    series: 'iPhone 16',
    availableStorages: ['256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Deserto', hex: '#C5A898', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Natural', hex: '#C3BCB2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Preto', hex: '#3E3D42', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Branco', hex: '#F4F2F1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.9" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A18 Pro',
    camera: 'Tripla 48MP Fusion + 48MP Ultra-wide + 12MP Telefoto 5x',
    connector: 'USB-C 3.0'
  },
  'iPhone 16 Pro': {
    model: 'iPhone 16 Pro',
    series: 'iPhone 16',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Natural', hex: '#C3BCB2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Deserto', hex: '#C5A898', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Preto', hex: '#3E3D42', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Branco', hex: '#F4F2F1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.3" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A18 Pro',
    camera: 'Tripla 48MP Fusion + 48MP Ultra-wide + 12MP Telefoto 5x',
    connector: 'USB-C 3.0'
  },
  'iPhone 16 Plus': {
    model: 'iPhone 16 Plus',
    series: 'iPhone 16',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Ultramarino', hex: '#5F7FB7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Rosa', hex: '#F3B5C5', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-pink?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#333538', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-black?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F5F5F7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-white?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED',
    chip: 'A18',
    camera: 'Dupla 48MP Fusion + 12MP Ultra-wide',
    connector: 'USB-C'
  },
  'iPhone 16': {
    model: 'iPhone 16',
    series: 'iPhone 16',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Ultramarino', hex: '#5F7FB7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Verde-acinzentado', hex: '#AEC3B0', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Rosa', hex: '#F3B5C5', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F5F5F7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#333538', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A18',
    camera: 'Dupla 48MP Fusion + 12MP Ultra-wide',
    connector: 'USB-C'
  },
  'iPhone 16e': {
    model: 'iPhone 16e',
    series: 'iPhone 16',
    availableStorages: ['128GB', '256GB'],
    colors: [
      { color: 'Preto', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F8F9FA', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina OLED',
    chip: 'A18',
    camera: '48MP Fusion',
    connector: 'USB-C'
  },

  // Linha 15 (15 Pro Max, 15 Pro, 15 Plus, 15)
  'iPhone 15 Pro Max': {
    model: 'iPhone 15 Pro Max',
    series: 'iPhone 15',
    availableStorages: ['256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Natural', hex: '#B8AF9F', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Azul', hex: '#3E4957', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Branco', hex: '#F2F1EC', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Preto', hex: '#3C3B37', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A17 Pro',
    camera: 'Tripla 48MP + 12MP Ultra-wide + 12MP Telefoto 5x',
    connector: 'USB-C 3.0'
  },
  'iPhone 15 Pro': {
    model: 'iPhone 15 Pro',
    series: 'iPhone 15',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Titânio Natural', hex: '#B8AF9F', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Azul', hex: '#3E4957', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Titânio Preto', hex: '#3C3B37', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED ProMotion 120Hz',
    chip: 'A17 Pro',
    camera: 'Tripla 48MP + 12MP Ultra-wide + 12MP Telefoto 3x',
    connector: 'USB-C 3.0'
  },
  'iPhone 15 Plus': {
    model: 'iPhone 15 Plus',
    series: 'iPhone 15',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Rosa', hex: '#F9D1D5', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Azul', hex: '#D2DBE1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#3A393E', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED com Dynamic Island',
    chip: 'A16 Bionic',
    camera: 'Dupla 48MP + 12MP Ultra-wide',
    connector: 'USB-C'
  },
  'iPhone 15': {
    model: 'iPhone 15',
    series: 'iPhone 15',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Azul', hex: '#D2DBE1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Rosa', hex: '#F9D1D5', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#3A393E', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Verde', hex: '#D3DDD1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Amarelo', hex: '#FCE788', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED com Dynamic Island',
    chip: 'A16 Bionic',
    camera: 'Dupla 48MP + 12MP Ultra-wide',
    connector: 'USB-C'
  },

  // Linha 14 (14 Pro Max, 14 Pro, 14 Plus, 14)
  'iPhone 14 Pro Max': {
    model: 'iPhone 14 Pro Max',
    series: 'iPhone 14',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Roxo Profundo', hex: '#594F63', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Dourado', hex: '#F3E8CE', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-gold?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto-espacial', hex: '#403E3D', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-spaceblack?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED 120Hz com Dynamic Island',
    chip: 'A16 Bionic',
    camera: 'Tripla 48MP + 12MP Ultra-wide + 12MP Telefoto 3x',
    connector: 'Lightning'
  },
  'iPhone 14 Pro': {
    model: 'iPhone 14 Pro',
    series: 'iPhone 14',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Roxo Profundo', hex: '#594F63', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto-espacial', hex: '#403E3D', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-spaceblack?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED 120Hz',
    chip: 'A16 Bionic',
    camera: 'Tripla 48MP',
    connector: 'Lightning'
  },
  'iPhone 14 Plus': {
    model: 'iPhone 14 Plus',
    series: 'iPhone 14',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Estelar', hex: '#FAF7F2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-starlight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Meia-noite', hex: '#232A31', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-midnight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Azul', hex: '#A0B4C8', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Roxo', hex: '#E3D7F4', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-purple?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED',
    chip: 'A15 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },
  'iPhone 14': {
    model: 'iPhone 14',
    series: 'iPhone 14',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Estelar', hex: '#FAF7F2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-starlight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Meia-noite', hex: '#232A31', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Azul', hex: '#A0B4C8', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A15 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },

  // Linha 13
  'iPhone 13 Pro Max': {
    model: 'iPhone 13 Pro Max',
    series: 'iPhone 13',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Azul Sierra', hex: '#9CB0C3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Grafite', hex: '#54524F', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED 120Hz',
    chip: 'A15 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 13 Pro': {
    model: 'iPhone 13 Pro',
    series: 'iPhone 13',
    availableStorages: ['128GB', '256GB', '512GB', '1TB'],
    colors: [
      { color: 'Azul Sierra', hex: '#9CB0C3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Grafite', hex: '#54524F', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED 120Hz',
    chip: 'A15 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 13': {
    model: 'iPhone 13',
    series: 'iPhone 13',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Meia-noite', hex: '#222930', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Estelar', hex: '#FAF6F0', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-starlight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Azul', hex: '#3E5C76', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-blue?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Rosa', hex: '#F9D0DA', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-pink?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A15 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },
  'iPhone 13 mini': {
    model: 'iPhone 13 mini',
    series: 'iPhone 13',
    availableStorages: ['128GB', '256GB'],
    colors: [
      { color: 'Meia-noite', hex: '#222930', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Estelar', hex: '#FAF6F0', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-starlight?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '5.4" Super Retina XDR OLED',
    chip: 'A15 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },

  // Linha 12
  'iPhone 12 Pro Max': {
    model: 'iPhone 12 Pro Max',
    series: 'iPhone 12',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Azul Pacífico', hex: '#2F4858', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Grafite', hex: '#4B4846', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.7" Super Retina XDR OLED',
    chip: 'A14 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 12 Pro': {
    model: 'iPhone 12 Pro',
    series: 'iPhone 12',
    availableStorages: ['128GB', '256GB', '512GB'],
    colors: [
      { color: 'Azul Pacífico', hex: '#2F4858', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Grafite', hex: '#4B4846', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A14 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 12': {
    model: 'iPhone 12',
    series: 'iPhone 12',
    availableStorages: ['64GB', '128GB', '256GB'],
    colors: [
      { color: 'Azul', hex: '#2B4560', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#28292B', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F6F5F0', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Super Retina XDR OLED',
    chip: 'A14 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },
  'iPhone 12 mini': {
    model: 'iPhone 12 mini',
    series: 'iPhone 12',
    availableStorages: ['64GB', '128GB'],
    colors: [
      { color: 'Preto', hex: '#28292B', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-black-select-2020?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F6F5F0', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-white-select-2020?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '5.4" Super Retina XDR OLED',
    chip: 'A14 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },

  // Linha 11
  'iPhone 11 Pro Max': {
    model: 'iPhone 11 Pro Max',
    series: 'iPhone 11',
    availableStorages: ['64GB', '256GB', '512GB'],
    colors: [
      { color: 'Cinza-espacial', hex: '#4B4846', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.5" Super Retina XDR OLED',
    chip: 'A13 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 11 Pro': {
    model: 'iPhone 11 Pro',
    series: 'iPhone 11',
    availableStorages: ['64GB', '256GB', '512GB'],
    colors: [
      { color: 'Cinza-espacial', hex: '#4B4846', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '5.8" Super Retina XDR OLED',
    chip: 'A13 Bionic',
    camera: 'Tripla 12MP',
    connector: 'Lightning'
  },
  'iPhone 11': {
    model: 'iPhone 11',
    series: 'iPhone 11',
    availableStorages: ['64GB', '128GB'],
    colors: [
      { color: 'Branco', hex: '#ECECE7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-white-select-2019?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Preto', hex: '#2C2B30', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-black-select-2019?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Liquid Retina HD',
    chip: 'A13 Bionic',
    camera: 'Dupla 12MP com Modo Noite',
    connector: 'Lightning'
  },

  // Linhas X, XR, XS, XS Max
  'iPhone XS Max': {
    model: 'iPhone XS Max',
    series: 'iPhone X / XS / XR',
    availableStorages: ['64GB', '256GB', '512GB'],
    colors: [
      { color: 'Dourado', hex: '#F4E7D3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-max-gold-select-2018?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Cinza-espacial', hex: '#3C3B3D', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-space-select-2018?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.5" Super Retina OLED',
    chip: 'A12 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },
  'iPhone XS': {
    model: 'iPhone XS',
    series: 'iPhone X / XS / XR',
    availableStorages: ['64GB', '256GB', '512GB'],
    colors: [
      { color: 'Dourado', hex: '#F4E7D3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-gold-select-2018?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Cinza-espacial', hex: '#3C3B3D', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-space-select-2018?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '5.8" Super Retina OLED',
    chip: 'A12 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  },
  'iPhone XR': {
    model: 'iPhone XR',
    series: 'iPhone X / XS / XR',
    availableStorages: ['64GB', '128GB'],
    colors: [
      { color: 'Preto', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-black-select-201809?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Branco', hex: '#F8F9FA', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-white-select-201809?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Azul', hex: '#2980B9', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-blue-select-201809?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '6.1" Liquid Retina HD',
    chip: 'A12 Bionic',
    camera: '12MP',
    connector: 'Lightning'
  },
  'iPhone X': {
    model: 'iPhone X',
    series: 'iPhone X / XS / XR',
    availableStorages: ['64GB', '256GB'],
    colors: [
      { color: 'Cinza-espacial', hex: '#38383A', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-space-select-2018?wid=1000&hei=1000&fmt=png-alpha' },
      { color: 'Prateado', hex: '#EEEEEE', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-x-silver-select-2017?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    screen: '5.8" Super Retina OLED',
    chip: 'A11 Bionic',
    camera: 'Dupla 12MP',
    connector: 'Lightning'
  }
};

export function normalizeModelName(raw: string): string {
  const lower = raw.toLowerCase().replace(/apple/g, '').trim();

  if (lower.includes('18 pro max') || lower.includes('18 pm')) return 'iPhone 18 Pro Max';
  if (lower.includes('18 pro')) return 'iPhone 18 Pro';

  if (lower.includes('17 pro max') || lower.includes('17 pm')) return 'iPhone 17 Pro Max';
  if (lower.includes('17 pro')) return 'iPhone 17 Pro';
  if (lower.includes('17 air') || lower.includes('17 slim')) return 'iPhone 17 Air';
  if (lower.includes('17')) return 'iPhone 17';

  if (lower.includes('16 pro max') || lower.includes('16 pm')) return 'iPhone 16 Pro Max';
  if (lower.includes('16 pro')) return 'iPhone 16 Pro';
  if (lower.includes('16 plus')) return 'iPhone 16 Plus';
  if (lower.includes('16e') || lower.includes('16 e')) return 'iPhone 16e';
  if (lower.includes('16')) return 'iPhone 16';

  if (lower.includes('15 pro max') || lower.includes('15 pm')) return 'iPhone 15 Pro Max';
  if (lower.includes('15 pro')) return 'iPhone 15 Pro';
  if (lower.includes('15 plus')) return 'iPhone 15 Plus';
  if (lower.includes('15')) return 'iPhone 15';

  if (lower.includes('14 pro max') || lower.includes('14 pm')) return 'iPhone 14 Pro Max';
  if (lower.includes('14 pro')) return 'iPhone 14 Pro';
  if (lower.includes('14 plus')) return 'iPhone 14 Plus';
  if (lower.includes('14')) return 'iPhone 14';

  if (lower.includes('13 pro max') || lower.includes('13 pm')) return 'iPhone 13 Pro Max';
  if (lower.includes('13 pro')) return 'iPhone 13 Pro';
  if (lower.includes('13 mini')) return 'iPhone 13 mini';
  if (lower.includes('13')) return 'iPhone 13';

  if (lower.includes('12 pro max') || lower.includes('12 pm')) return 'iPhone 12 Pro Max';
  if (lower.includes('12 pro')) return 'iPhone 12 Pro';
  if (lower.includes('12 mini')) return 'iPhone 12 mini';
  if (lower.includes('12')) return 'iPhone 12';

  if (lower.includes('11 pro max') || lower.includes('11 pm')) return 'iPhone 11 Pro Max';
  if (lower.includes('11 pro')) return 'iPhone 11 Pro';
  if (lower.includes('11')) return 'iPhone 11';

  if (lower.includes('xs max') || lower.includes('xsmax')) return 'iPhone XS Max';
  if (lower.includes('xs')) return 'iPhone XS';
  if (lower.includes('xr')) return 'iPhone XR';
  if (lower.includes('iphone x') || lower === 'x') return 'iPhone X';

  return raw.startsWith('iPhone') ? raw : `iPhone ${raw}`;
}

export function detectSeries(model: string): iPhoneSeries {
  const norm = normalizeModelName(model);
  if (norm.includes('18')) return 'iPhone 18';
  if (norm.includes('17')) return 'iPhone 17';
  if (norm.includes('16')) return 'iPhone 16';
  if (norm.includes('15')) return 'iPhone 15';
  if (norm.includes('14')) return 'iPhone 14';
  if (norm.includes('13')) return 'iPhone 13';
  if (norm.includes('12')) return 'iPhone 12';
  if (norm.includes('11')) return 'iPhone 11';
  if (norm.includes('XS') || norm.includes('XR') || norm.includes('iPhone X')) return 'iPhone X / XS / XR';
  return 'Outros';
}

export function matchIPhoneImage(model: string, color: string): { imageUrl: string; hex: string } {
  const norm = normalizeModelName(model);
  const entry = IPHONE_CATALOG[norm];

  if (entry && entry.colors.length > 0) {
    const cleanColor = color.toLowerCase().trim();
    const matched = entry.colors.find(c => 
      c.color.toLowerCase().includes(cleanColor) || cleanColor.includes(c.color.toLowerCase())
    );
    if (matched) {
      return { imageUrl: matched.imageUrl || entry.colors[0].imageUrl || '', hex: matched.hex };
    }
    return { imageUrl: entry.colors[0].imageUrl || '', hex: entry.colors[0].hex };
  }

  const fallbackHex = getHexForColor(color);
  return {
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha',
    hex: fallbackHex
  };
}

export function getHexForColor(colorName: string): string {
  const c = colorName.toLowerCase();
  if (c.includes('deserto')) return '#C5A898';
  if (c.includes('natural')) return '#B8AF9F';
  if (c.includes('preto') || c.includes('black') || c.includes('dark') || c.includes('grafite') || c.includes('espacial')) return '#303032';
  if (c.includes('branco') || c.includes('white') || c.includes('estelar') || c.includes('silver') || c.includes('prata')) return '#F5F5F7';
  if (c.includes('azul') || c.includes('blue') || c.includes('sierra') || c.includes('ultramarino') || c.includes('pacífico') || c.includes('pacifico')) return '#3E5C76';
  if (c.includes('rosa') || c.includes('pink')) return '#F7CAD0';
  if (c.includes('verde') || c.includes('green') || c.includes('alpino')) return '#40534C';
  if (c.includes('roxo') || c.includes('purple')) return '#665C7B';
  if (c.includes('dourado') || c.includes('gold')) return '#F3E8CE';
  if (c.includes('vermelho') || c.includes('red')) return '#BF211E';
  if (c.includes('amarelo') || c.includes('yellow')) return '#FCE788';
  if (c.includes('coral')) return '#E67E22';
  return '#4A4A4F';
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'DaCell',
  tagline: 'Garopaba - SC',
  whatsappNumber: '5555991720420',
  instagramHandle: '@dacell.sc',
  city: 'Garopaba - SC',
  deliveryInfo: 'Atendimento e retirada em Garopaba - SC ou envio seguro',
  pixDiscountPercent: 5,
  maxCardInstallments: 18,
  adminPin: '1909'
};

// Estoque com fotos oficiais da Apple com fundo branco padrão Mercado Livre / Magalu
// Cada item reflete EXATAMENTE as opções reais disponíveis
export const INITIAL_INVENTORY: iPhoneItem[] = [
  {
    id: 'dacell-1',
    model: 'iPhone 16 Pro Max',
    series: 'iPhone 16',
    storage: '256GB',
    availableStorages: ['256GB'],
    color: 'Titânio Deserto',
    colorHex: '#C5A898',
    availableColors: [
      { color: 'Titânio Deserto', hex: '#C5A898', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 7890,
    originalPrice: 8890,
    batteryHealth: null,
    condition: 'Lacrado',
    isAvailable: true,
    notes: 'Aparelho novo na caixa lacrada, padrão Anatel.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-2',
    model: 'iPhone 16 Pro',
    series: 'iPhone 16',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Titânio Natural',
    colorHex: '#C3BCB2',
    availableColors: [
      { color: 'Titânio Natural', hex: '#C3BCB2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 6790,
    originalPrice: 7490,
    batteryHealth: null,
    condition: 'Lacrado',
    isAvailable: true,
    notes: 'Na caixa com cabo original.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-3',
    model: 'iPhone 16 Plus',
    series: 'iPhone 16',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Ultramarino',
    colorHex: '#5F7FB7',
    availableColors: [
      { color: 'Ultramarino', hex: '#5F7FB7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 5790,
    originalPrice: 6390,
    batteryHealth: null,
    condition: 'Lacrado',
    isAvailable: true,
    notes: 'Tela grande de 6.7" e bateria de longa duração.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-4',
    model: 'iPhone 16e',
    series: 'iPhone 16',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Preto',
    colorHex: '#262626',
    availableColors: [
      { color: 'Preto', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 4590,
    originalPrice: 5100,
    batteryHealth: null,
    condition: 'Lacrado',
    isAvailable: true,
    notes: 'Novo modelo compacto com desempenho A18.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-5',
    model: 'iPhone 15 Pro Max',
    series: 'iPhone 15',
    storage: '256GB',
    availableStorages: ['256GB'],
    color: 'Titânio Azul',
    colorHex: '#3E4957',
    availableColors: [
      { color: 'Titânio Azul', hex: '#3E4957', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 5490,
    originalPrice: 6190,
    batteryHealth: 96,
    condition: 'Seminovo Impecável',
    isAvailable: true,
    notes: 'Sem marcas, bateria em 96%. Acompanha caixa e cabo.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-6',
    model: 'iPhone 15 Plus',
    series: 'iPhone 15',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Rosa',
    colorHex: '#F9D1D5',
    availableColors: [
      { color: 'Rosa', hex: '#F9D1D5', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 4290,
    originalPrice: 4890,
    batteryHealth: 95,
    condition: 'Seminovo Impecável',
    isAvailable: true,
    notes: 'Entrada USB-C, Dynamic Island e bateria 95%.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-7',
    model: 'iPhone 15',
    series: 'iPhone 15',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Azul',
    colorHex: '#D2DBE1',
    availableColors: [
      { color: 'Azul', hex: '#D2DBE1', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 3790,
    originalPrice: 4290,
    batteryHealth: 94,
    condition: 'Seminovo Impecável',
    isAvailable: true,
    notes: 'Impecável sem detalhes, cabo original.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-8',
    model: 'iPhone 14 Pro Max',
    series: 'iPhone 14',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Roxo Profundo',
    colorHex: '#594F63',
    availableColors: [
      { color: 'Roxo Profundo', hex: '#594F63', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 4190,
    originalPrice: 4790,
    batteryHealth: 89,
    condition: 'Seminovo Impecável',
    isAvailable: true,
    notes: 'Cor exclusiva Deep Purple, câmera 48MP.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-9',
    model: 'iPhone 14 Plus',
    series: 'iPhone 14',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Estelar',
    colorHex: '#FAF7F2',
    availableColors: [
      { color: 'Estelar', hex: '#FAF7F2', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-starlight?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 3390,
    originalPrice: 3890,
    batteryHealth: 91,
    condition: 'Seminovo Impecável',
    isAvailable: true,
    notes: 'Tela 6.7", excelente retenção de bateria.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-7inch-starlight?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-10',
    model: 'iPhone 13',
    series: 'iPhone 13',
    storage: '128GB',
    availableStorages: ['128GB'],
    color: 'Meia-noite',
    colorHex: '#222930',
    availableColors: [
      { color: 'Meia-noite', hex: '#222930', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 2590,
    originalPrice: 2990,
    batteryHealth: 88,
    condition: 'Excelente',
    isAvailable: true,
    notes: 'Bateria 88% original, Face ID e tela 100%.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-11',
    model: 'iPhone 12',
    series: 'iPhone 12',
    storage: '64GB',
    availableStorages: ['64GB'],
    color: 'Azul',
    colorHex: '#2B4560',
    availableColors: [
      { color: 'Azul', hex: '#2B4560', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 1890,
    originalPrice: 2290,
    batteryHealth: 86,
    condition: 'Muito Bom',
    isAvailable: true,
    notes: 'Conexão 5G, tela OLED, ótimo estado.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-12',
    model: 'iPhone 11',
    series: 'iPhone 11',
    storage: '64GB',
    availableStorages: ['64GB'],
    color: 'Branco',
    colorHex: '#ECECE7',
    availableColors: [
      { color: 'Branco', hex: '#ECECE7', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-white-select-2019?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 1490,
    originalPrice: 1790,
    batteryHealth: 85,
    condition: 'Muito Bom',
    isAvailable: true,
    notes: 'Câmera dupla, revisado e pronto para uso.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-white-select-2019?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-13',
    model: 'iPhone XR',
    series: 'iPhone X / XS / XR',
    storage: '64GB',
    availableStorages: ['64GB'],
    color: 'Preto',
    colorHex: '#262626',
    availableColors: [
      { color: 'Preto', hex: '#262626', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-black-select-201809?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 1190,
    originalPrice: 1450,
    batteryHealth: 84,
    condition: 'Muito Bom',
    isAvailable: true,
    notes: 'Face ID 100%, tela sem trincados.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xr-black-select-201809?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  },
  {
    id: 'dacell-14',
    model: 'iPhone XS Max',
    series: 'iPhone X / XS / XR',
    storage: '64GB',
    availableStorages: ['64GB'],
    color: 'Dourado',
    colorHex: '#F4E7D3',
    availableColors: [
      { color: 'Dourado', hex: '#F4E7D3', imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-max-gold-select-2018?wid=1000&hei=1000&fmt=png-alpha' }
    ],
    price: 1390,
    originalPrice: 1690,
    batteryHealth: 83,
    condition: 'Muito Bom',
    isAvailable: true,
    notes: 'Tela grande OLED de 6.5", acabamento dourado.',
    imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-xs-max-gold-select-2018?wid=1000&hei=1000&fmt=png-alpha',
    createdAt: new Date().toISOString()
  }
];
