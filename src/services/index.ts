// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.goldchy.com';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface GoldPrice {
  id: string;
  type: 'gold_18k' | 'gold_24k' | 'coin_emami' | 'coin_half' | 'coin_quarter';
  name: string;
  nameEn: string;
  price: number;
  unit: 'gram' | 'piece';
  change: number;
  changePercent: number;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'transfer';
  goldType?: string;
  amount: number;
  weight?: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Wallet {
  cashBalance: number;
  goldAssets: {
    type: string;
    weight: number;
    value: number;
  }[];
  totalValue: number;
}

// API Client (placeholder - implement with your backend)
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error('API Error');
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);

// Service functions
export const authService = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: User }>('/auth/login', { email, password }),
  
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post<{ token: string; user: User }>('/auth/register', data),
  
  logout: () => api.post('/auth/logout', {}),
};

export const priceService = {
  getAll: () => api.get<GoldPrice[]>('/prices'),
  getByType: (type: string) => api.get<GoldPrice>(`/prices/${type}`),
};

export const walletService = {
  getBalance: () => api.get<Wallet>('/wallet'),
  deposit: (amount: number) => api.post('/wallet/deposit', { amount }),
  withdraw: (amount: number) => api.post('/wallet/withdraw', { amount }),
};

export const transactionService = {
  getAll: () => api.get<Transaction[]>('/transactions'),
  buy: (data: { goldType: string; amount: number }) =>
    api.post<Transaction>('/transactions/buy', data),
  sell: (data: { goldType: string; weight: number }) =>
    api.post<Transaction>('/transactions/sell', data),
};
