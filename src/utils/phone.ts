/**
 * Telefon raqamdan barcha raqam bo'lmagan belgilarni olib tashlaydi
 */
export const cleanPhoneNumber = (phone: string) => {
    // Faqat raqamlar va '+' belgisini qoldiramiz (E.164 formati uchun)
    return phone.replace(/[^\d+]/g, "");
};

/**
 * Telefon raqamni formatlaydi (masalan, +998 90 123 45 67)
 */
export const formatPhoneNumber = (phone: string) => {
    const cleaned = cleanPhoneNumber(phone);

    // O'zbekiston formatiga moslash: 998 90 123 45 67
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phone;
};