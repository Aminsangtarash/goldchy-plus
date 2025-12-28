// API Configuration
const API_BASE_URL = 'https://api.goldchy.com'; // Replace with actual API URL

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

export interface SabteAhvalInquiryRequest {
  nationalCode: string;
}

export interface SabteAhvalInquiryResponse {
  success: boolean;
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  birthDate?: string;
  message?: string;
}

export interface BankInquiryRequest {
  cardNumber?: string;
  iban?: string;
  accountNumber?: string;
}

export interface BankInquiryResponse {
  success: boolean;
  bankName?: string;
  ownerName?: string;
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

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
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
  /**
   * Shahkar system inquiry - verify national code and phone number match
   */
  shahkarInquiry: async (
    request: ShahkarInquiryRequest,
  ): Promise<ShahkarInquiryResponse> => {
    try {
      return await apiClient.post<ShahkarInquiryResponse>(
        '/inquiry/shahkar',
        request,
      );
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for shahkar inquiry');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const isMatch = Math.random() > 0.5;
      return {
        success: true,
        isMatch,
        nationalCode: request.nationalCode,
        phoneNumber: request.phoneNumber,
        message: isMatch
          ? 'کدملی و شماره همراه تطابق دارند'
          : 'کدملی و شماره همراه تطابق ندارند',
      };
    }
  },

  /**
   * Sabte Ahval inquiry - get personal information by national code
   */
  sabteAhvalInquiry: async (
    request: SabteAhvalInquiryRequest,
  ): Promise<SabteAhvalInquiryResponse> => {
    try {
      return await apiClient.post<SabteAhvalInquiryResponse>(
        '/inquiry/sabteahval',
        request,
      );
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for sabte ahval inquiry');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        firstName: 'علی',
        lastName: 'محمدی',
        fatherName: 'حسین',
        birthDate: '۱۳۷۰/۰۵/۱۵',
      };
    }
  },

  /**
   * Bank inquiry - get bank account information
   */
  bankInquiry: async (
    request: BankInquiryRequest,
  ): Promise<BankInquiryResponse> => {
    try {
      return await apiClient.post<BankInquiryResponse>(
        '/inquiry/bank',
        request,
      );
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for bank inquiry');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        bankName: 'بانک ملت',
        ownerName: 'علی محمدی',
      };
    }
  },
};

// Wallet Service
export const WalletService = {
  /**
   * Get user wallet balance
   */
  getBalance: async (): Promise<WalletBalance> => {
    try {
      return await apiClient.get<WalletBalance>('/wallet/balance');
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for wallet balance');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        balance: 3256000,
        currency: 'IRR',
      };
    }
  },

  /**
   * Add funds to wallet
   */
  addFunds: async (amount: number): Promise<PaymentResponse> => {
    try {
      return await apiClient.post<PaymentResponse>('/wallet/add-funds', {
        amount,
      });
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for add funds');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        transactionId: `TXN${Date.now()}`,
      };
    }
  },

  /**
   * Process payment from wallet
   */
  processPayment: async (
    request: PaymentRequest,
  ): Promise<PaymentResponse> => {
    try {
      return await apiClient.post<PaymentResponse>(
        '/wallet/payment',
        request,
      );
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for payment');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        transactionId: `TXN${Date.now()}`,
      };
    }
  },
};

// Auth Service
export const AuthService = {
  /**
   * Send OTP to phone number
   */
  sendOTP: async (phoneNumber: string): Promise<{success: boolean; message?: string}> => {
    try {
      return await apiClient.post('/auth/send-otp', {phoneNumber});
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for send OTP');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {success: true};
    }
  },

  /**
   * Verify OTP and login
   */
  verifyOTP: async (
    phoneNumber: string,
    otp: string,
  ): Promise<{success: boolean; token?: string; message?: string}> => {
    try {
      const response = await apiClient.post<{
        success: boolean;
        token?: string;
        message?: string;
      }>('/auth/verify-otp', {phoneNumber, otp});
      
      if (response.success && response.token) {
        apiClient.setToken(response.token);
      }
      
      return response;
    } catch (error) {
      // Mock response for development
      console.log('Using mock response for verify OTP');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockToken = `mock_token_${Date.now()}`;
      apiClient.setToken(mockToken);
      return {
        success: true,
        token: mockToken,
      };
    }
  },

  /**
   * Logout
   */
  logout: () => {
    apiClient.clearToken();
  },
};

// Export API client for direct use if needed
export {apiClient};
