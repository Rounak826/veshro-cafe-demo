import { Order } from '@/types';

export function formatWhatsAppMessage(order: Order): string {
    const itemsList = order.items
        .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`)
        .join('\n');

    const message = `*New Order from Veshro Cafe* ☕
-----------------------------
*Order Type:* ${order.orderType.toUpperCase()}
*Name:* ${order.recipientName}
*Phone:* ${order.recipientPhone}
${order.orderType === 'delivery' ? `*Address:* ${order.deliveryAddress || 'Location Shared'}\n${order.geolocation ? `*Map Location:* ${order.geolocation.mapLink}\n` : ''}` : ''}
*Items:*
${itemsList}

*Total: ₹${order.total}*
-----------------------------
(Sent from Veshro App)`;

    return encodeURIComponent(message);
}

export function openWhatsApp(phone: string, message: string) {
    // Use Veshro Cafe's number. For now, using a placeholder or user provided.
    // Assuming a generic number or configurable.
    const cafeNumber = phone; // Replace with actual number
    window.open(`https://wa.me/${cafeNumber}?text=${message}`, '_blank');
}
