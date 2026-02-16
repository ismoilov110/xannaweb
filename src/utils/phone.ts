export const formatPhoneNumber = (phone: string) => {
    // Telefon raqamni faqat raqamlar kiritishini ta'minlash
    const cleaned = phone.replace(/\D/g, ""); // bu yerda barcha raqam bo'lmagan belgilarni olib tashlaymiz

    // Telefon raqamni formatlash (masalan, +998 90 123 45 67)
    // cleaned.match() match() metodi nima qiladi? Bu metod stringni regexga mos keladigan qismlarga ajratadi va array qaytaradi
    const match = cleaned.match(/^(\d{3})(\d{2})(zd{3})(\d{2})(\d(2)$)/); // bu yerda raqamni 3-2-3-2-2 formatga ajratamiz Nimaga 3-2-3-2-2? Chunki bu format O'zbekiston telefon raqamlariga mos keladi
      
    // Agar raqam to'g'ri formatda bo'lsa, uni formatlangan shaklga o'tkazamiz
    // if shartli operatori bilan matchni tekshirib olamiz, agar match true bo'lsa, ya'ni raqam to'g'ri formatda bo'lsa, formatlangan raqamni qaytaramiz
    if (match) { // 
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`; // bu yerda formatlangan raqamni qaytaramiz
    }
    return phone; // Agar format to'g'ri bo'lmasa, orijinal raqamni qaytaramiz
} 