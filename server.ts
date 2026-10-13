import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint para identificação e extração de iPhones com IA
app.post('/api/parse-stock', async (req: Request, res: Response) => {
  try {
    const { rawText } = req.body;
    if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
      return res.status(400).json({ error: 'Nenhum texto de estoque foi fornecido.' });
    }

    // Se temos a chave da API Gemini configurada, usamos gemini-3.8-flash com schema estruturado
    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analise a seguinte lista de estoque de iPhones e extraia cada modelo individualmente em formato estruturado. A lista pode conter gírias de lojistas brasileiros como "15 pm", "13 128 lacrado", "bat 89%", "sem marcas", etc.

LISTA DE ESTOQUE:
"""
${rawText}
"""`,
        config: {
          systemInstruction: `Você é um assistente especialista em catálogo da Apple para a loja DaCell em Garopaba - SC.
Sua missão é ler listas brutas de fornecedores ou mensagens de WhatsApp com estoque de iPhones e estruturar cada item em um objeto padronizado com os seguintes campos:
- model: Nome padronizado do modelo Apple oficial. Suporta do iPhone X até o iPhone 18, incluindo:
  - iPhone 18 Pro Max, iPhone 18 Pro
  - iPhone 17 Pro Max, iPhone 17 Pro, iPhone 17 Air, iPhone 17
  - iPhone 16 Pro Max, iPhone 16 Pro, iPhone 16 Plus, iPhone 16e, iPhone 16
  - iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15
  - iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14
  - iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13 mini, iPhone 13
  - iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12 mini, iPhone 12
  - iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11
  - iPhone XS Max, iPhone XS, iPhone XR, iPhone X. Sempre inicie com "iPhone".
- storage: Capacidade de armazenamento (ex: "64GB", "128GB", "256GB", "512GB", "1TB").
- color: Nome elegante da cor oficial (ex: "Titânio Deserto", "Titânio Natural", "Titânio Azul", "Meia-noite", "Estelar", "Preto", "Branco", "Rosa", "Azul", "Dourado", "Grafite").
- condition: Condição física ("Lacrado", "Seminovo Impecável", "Excelente" ou "Muito Bom").
- batteryHealth: Porcentagem de saúde da bateria como número inteiro (ex: 88, 92, 100). Se for "Lacrado" ou novo, defina como null.
- price: Preço em Reais numérico (ex: 4500 ou 4500.00). Remova símbolos como R$, pontos de milhar, etc.
- originalPrice: Preço estimado ligeiramente superior (ex: 15% acima).
- notes: Observações extras sobre acessórios, caixa, cabo ou estado do aparelho.`,
          responseMimeType: 'application/json',
        },
      });

      const rawResponseText = response.text || '[]';
      const cleanResponseText = rawResponseText.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsedItems = JSON.parse(cleanResponseText);
      return res.json({ success: true, items: parsedItems, source: 'gemini' });
    }

    // Heurística local de fallback caso a chave não esteja disponível no ambiente de teste
    const fallbackItems = fallbackStockParser(rawText);
    return res.json({ success: true, items: fallbackItems, source: 'heuristic' });

  } catch (error: any) {
    console.error('Erro ao analisar estoque com Gemini:', error);
    try {
      const fallbackItems = fallbackStockParser(req.body.rawText || '');
      return res.json({
        success: true,
        items: fallbackItems,
        source: 'heuristic_fallback',
        warning: 'Processado com motor de compatibilidade local.',
      });
    } catch (fallbackError) {
      return res.status(500).json({
        error: 'Não foi possível interpretar a lista de aparelhos.',
        details: error.message,
      });
    }
  }
});

// Parser de contingência em TypeScript com regras determinísticas
function fallbackStockParser(text: string) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);
  const items: any[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('estoque') || lower.includes('tabela') || lower.includes('bom dia') || lower.includes('lista')) {
      continue;
    }

    // Detecta modelo completo do X ao 18 com limites de palavra
    let model = 'iPhone 13';
    if (/\b(18\s*pro\s*max|18\s*pm)\b/i.test(lower)) model = 'iPhone 18 Pro Max';
    else if (/\b18\s*pro\b/i.test(lower)) model = 'iPhone 18 Pro';
    else if (/\b(17\s*pro\s*max|17\s*pm)\b/i.test(lower)) model = 'iPhone 17 Pro Max';
    else if (/\b17\s*pro\b/i.test(lower)) model = 'iPhone 17 Pro';
    else if (/\b(17\s*air|17\s*slim)\b/i.test(lower)) model = 'iPhone 17 Air';
    else if (/\b17\b/i.test(lower)) model = 'iPhone 17';
    else if (/\b(16\s*pro\s*max|16\s*pm)\b/i.test(lower)) model = 'iPhone 16 Pro Max';
    else if (/\b16\s*pro\b/i.test(lower)) model = 'iPhone 16 Pro';
    else if (/\b16\s*plus\b/i.test(lower)) model = 'iPhone 16 Plus';
    else if (/\b16\s*e\b/i.test(lower)) model = 'iPhone 16e';
    else if (/\b16\b/i.test(lower)) model = 'iPhone 16';
    else if (/\b(15\s*pro\s*max|15\s*pm)\b/i.test(lower)) model = 'iPhone 15 Pro Max';
    else if (/\b15\s*pro\b/i.test(lower)) model = 'iPhone 15 Pro';
    else if (/\b15\s*plus\b/i.test(lower)) model = 'iPhone 15 Plus';
    else if (/\b15\b/i.test(lower)) model = 'iPhone 15';
    else if (/\b(14\s*pro\s*max|14\s*pm)\b/i.test(lower)) model = 'iPhone 14 Pro Max';
    else if (/\b14\s*pro\b/i.test(lower)) model = 'iPhone 14 Pro';
    else if (/\b14\s*plus\b/i.test(lower)) model = 'iPhone 14 Plus';
    else if (/\b14\b/i.test(lower)) model = 'iPhone 14';
    else if (/\b(13\s*pro\s*max|13\s*pm)\b/i.test(lower)) model = 'iPhone 13 Pro Max';
    else if (/\b13\s*pro\b/i.test(lower)) model = 'iPhone 13 Pro';
    else if (/\b13\s*mini\b/i.test(lower)) model = 'iPhone 13 mini';
    else if (/\b13\b/i.test(lower)) model = 'iPhone 13';
    else if (/\b(12\s*pro\s*max|12\s*pm)\b/i.test(lower)) model = 'iPhone 12 Pro Max';
    else if (/\b12\s*pro\b/i.test(lower)) model = 'iPhone 12 Pro';
    else if (/\b12\s*mini\b/i.test(lower)) model = 'iPhone 12 mini';
    else if (/\b12\b/i.test(lower)) model = 'iPhone 12';
    else if (/\b(11\s*pro\s*max|11\s*pm)\b/i.test(lower)) model = 'iPhone 11 Pro Max';
    else if (/\b11\s*pro\b/i.test(lower)) model = 'iPhone 11 Pro';
    else if (/\bxs\s*max\b/i.test(lower)) model = 'iPhone XS Max';
    else if (/\bxs\b/i.test(lower)) model = 'iPhone XS';
    else if (/\bxr\b/i.test(lower)) model = 'iPhone XR';
    else if (/\b(iphone\s*x|apple\s*x)\b/i.test(lower)) model = 'iPhone X';
    else if (/\b11\b/i.test(lower)) model = 'iPhone 11';

    // Detecta capacidade
    let storage = '128GB';
    if (lower.includes('64gb') || lower.includes('64 gb') || /\b64\b/.test(lower)) storage = '64GB';
    else if (lower.includes('256gb') || lower.includes('256 gb') || /\b256\b/.test(lower)) storage = '256GB';
    else if (lower.includes('512gb') || lower.includes('512 gb') || /\b512\b/.test(lower)) storage = '512GB';
    else if (lower.includes('1tb') || lower.includes(' 1t')) storage = '1TB';

    // Detecta cor
    let color = 'Preto';
    if (lower.includes('natural')) color = 'Titânio Natural';
    else if (lower.includes('deserto')) color = 'Titânio Deserto';
    else if (lower.includes('azul') || lower.includes('blue')) color = 'Azul';
    else if (lower.includes('branco') || lower.includes('white')) color = 'Branco';
    else if (lower.includes('estelar')) color = 'Estelar';
    else if (lower.includes('meia-noite') || lower.includes('meianoite')) color = 'Meia-noite';
    else if (lower.includes('rosa') || lower.includes('pink')) color = 'Rosa';
    else if (lower.includes('roxo') || lower.includes('purple')) color = 'Roxo Profundo';
    else if (lower.includes('verde') || lower.includes('green')) color = 'Verde';
    else if (lower.includes('dourado') || lower.includes('gold')) color = 'Dourado';

    // Detecta condição e bateria
    const isLacrado = lower.includes('lacrado') || lower.includes('novo') || lower.includes('zero');
    const condition = isLacrado ? 'Lacrado' : 'Seminovo Impecável';

    let batteryHealth: number | null = null;
    const batMatch = line.match(/(?:bat|bateria|saude|saúde)?\s*([789][0-9]|100)\s*%/i) || line.match(/\b([789][0-9]|100)%\b/);
    if (batMatch && !isLacrado) {
      batteryHealth = parseInt(batMatch[1], 10);
    }

    // Detecta preço
    let price = 3500;
    const priceMatch = line.match(/(?:r\$|r)?\s*(\d{1,2}[\.,]\d{3}|\d{4,5})/i);
    if (priceMatch) {
      const cleanNum = priceMatch[1].replace(/\./g, '').replace(',', '.');
      price = parseFloat(cleanNum);
    } else {
      const trailingNumber = line.match(/(\d{3,5})\s*$/);
      if (trailingNumber) {
        price = parseFloat(trailingNumber[1]);
      }
    }

    items.push({
      model,
      storage,
      color,
      condition,
      batteryHealth: isLacrado ? null : (batteryHealth || 90),
      price: price > 0 ? price : 3000,
      originalPrice: Math.round(price * 1.15),
      notes: line.length > 25 ? line : 'Aparelho revisado e testado.',
    });
  }

  return items;
}

// Configuração de ambiente de desenvolvimento vs produção
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
