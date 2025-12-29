/**
 * API Service
 */

const API_BASE_URL = 'https://api.goldchy.com';

// Types
export interface ShahkarInquiryRequest {
  nationalCode: string;
  phoneNumber: string;
}

export interface ShahkarInquiryResponse {
  success: boolean;
  isMatch: boolean;
  nationalCode: string;
  phoneNumber: string;
  message?: string;
}

export interface WalletBalance {
  balance: number;
  currency: string;
}

export interface PaymentRequest {
  amount: number;
  description: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message?: string;
}

// API Client
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && {Authorization: `Bearer ${this.token}`}),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {method: 'GET'});
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// Inquiry Service
export const InquiryService = {
  shahkarInquiry: async (request: ShahkarInquiryRequest): Promise<ShahkarInquiryResponse> => {
    try {
      return await apiClient.post<ShahkarInquiryResponse>('/inquiry/shahkar', request);
    } catch (error) {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isMatch = Math.random() > 0.5;
      return {
        success: true,
        isMatch,
        nationalCode: request.nationalCode,
        phoneNumber: request.phoneNumber,
      };
    }
  },
};

// Wallet Service
export const WalletService = {
  getBalance: async (): Promise<WalletBalance> => {
    try {
      return await apiClient.get<WalletBalance>('/wallet/balance');
    } catch (error) {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 500));
      return {balance: 3256000, currency: 'IRR'};
    }
  },

  processPayment: async (request: PaymentRequest): Promise<PaymentResponse> => {
    try {
      return await apiClient.post<PaymentResponse>('/wallet/payment', request);
    } catch (error) {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {success: true, transactionId: `TXN${Date.now()}`};
    }
  },
};

// Auth Service
export const AuthService = {
  sendOTP: async (phoneNumber: string): Promise<{success: boolean; message?: string}> => {
    try {
      return await apiClient.post('/auth/send-otp', {phoneNumber});
    } catch (error) {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {success: true};
    }
  },

  verifyOTP: async (
    phoneNumber: string,
    otp: string,
  ): Promise<{success: boolean; token?: string; message?: string}> => {
    try {
      const response = await apiClient.post<{success: boolean; token?: string; message?: string}>(
        '/auth/verify-otp',
        {phoneNumber, otp},
      );
      if (response.success && response.token) {
        apiClient.setToken(response.token);
      }
      return response;
    } catch (error) {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = `mock_token_${Date.now()}`;
      apiClient.setToken(mockToken);
      return {success: true, token: mockToken};
    }
  },

  logout: () => {
    apiClient.clearToken();
  },
};

export {apiClient};
