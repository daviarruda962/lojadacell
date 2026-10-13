export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatInstallments(price: number, maxInstallments: number = 18): string {
  return `em até ${maxInstallments}x no cartão (consultar juros)`;
}

export function generateWhatsAppLink(
  phone: string,
  model: string,
  storage: string,
  color: string,
  price: number,
  batteryHealth?: number | null,
  condition?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const destinationPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

  let text = `Olá! Vi o *${model} ${storage} (${color})* na vitrine por *${formatCurrency(price)}*`;
  
  if (batteryHealth) {
    text += ` (bateria em *${batteryHealth}%*)`;
  } else if (condition?.toLowerCase().includes('lacrado')) {
    text += ` (*Lacrado*)`;
  }

  text += `.\n\nEstá disponível? Gostaria de mais informações sobre pagamento em até 18x ou à vista.`;

  return `https://wa.me/${destinationPhone}?text=${encodeURIComponent(text)}`;
}

export function generateGenericWhatsAppLink(phone: string, storeName: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const destinationPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  const text = `Olá, equipe da *${storeName}*! Gostaria de consultar os modelos de iPhone disponíveis no estoque.`;
  return `https://wa.me/${destinationPhone}?text=${encodeURIComponent(text)}`;
}
