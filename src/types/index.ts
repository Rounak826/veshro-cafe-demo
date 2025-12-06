export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isPopular?: boolean;
    isVeg?: boolean;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface Order {
    items: CartItem[];
    total: number;
    recipientName: string;
    recipientPhone: string;
    deliveryAddress?: string;
    geolocation?: {
        lat: number;
        lng: number;
        mapLink: string;
    };
    orderType: 'takeaway' | 'delivery';
    paymentMethod: 'cash' | 'upi';
}
