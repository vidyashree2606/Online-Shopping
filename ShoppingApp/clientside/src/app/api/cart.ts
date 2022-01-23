    export interface CartItem {
        productId: number;
        type: string;
        name: string;
        price: number;
        imgURL: string;
        quantity: number;
    }

    export interface Cart {
        id: number;
        buyingId: string;
        items: CartItem[];
    }