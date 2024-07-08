export interface IProduct {
    id:number;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId?: number;
    stock: number;
  }

  export interface ICategory {
    id:number;
    name: string;
  }

  export interface ILoginProps {
      email: string;    
		  password: string; 
    }

    export interface ILoginPropsError {
      email?: string;    
		  password?: string; 
      [key: string]: string | undefined;
    }

    export interface IRegisterProps {
      email: string;    
		  password: string; 
      confirmPassword?: string;
      name: string; 
      address: string; 
      phone: string; 
    }

    export interface IRegisterPropsError {
      email?: string;    
		  password?: string; 
      confirmPassword?: string;
      name?: string; 
      address?: string; 
      phone?: string; 
      [key: string]: string | undefined;
    }

    export interface IOrder {
    id: number;
    status: string;
    date: string;
    products?: IProduct[];
    }
    export interface IUserSession {
    token: string;
    user: {
      address: string;
      email: string;
      id: number;
      name: string;
      phone: string;
      orders: IOrder[];
      role: string;
      }
    }

    export interface IAuthContextProps {
      userData: IUserSession | null;
      login: (userData: IUserSession) => void;
      logout: (userData: IUserSession | null) => void;
      setRedirectPath: (path: string) => void;
    }

    export interface IProviderProps {
      children: React.ReactElement
  }

  export interface ICartContextProps { 
  cart: ICartSession | null;
  totalPrice: number;
  addToCart: (product: IProduct) => void;
  clearCart: () => void;
  removeProduct: (productId: number) => void;
}

export interface ICartSession {
  userID: number | undefined; 
  cart: IProduct[]
}

export interface ICreateOrderParams {
  cart: IProduct[] | undefined;
  token: string | undefined;
}

export interface IOrderParams {
  id: number | undefined;
  token: string | undefined;
}
  
export interface IStoreCardProps {
  id: number;
  name: string;
  location: string;
  phone: string;
  image: string;
}
 