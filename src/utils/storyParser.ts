export type Advice = {
    appearance: string,
    health: string,
    vitamin: string,
    activity: string,
};


export function parseAIResponse(text: string): Advice {
    const t = (text || "").trim()

    const pick = (emoji: string) => {
        const idx = t.indexOf(emoji);
        if (idx === -1) return "";
        const emojis = ["💖", "🌿", "💊", "🚶"];
        const others = emojis.filter(e => e !== emoji);
        const end = Math.min(
            ...others.map(e => t.indexOf(e, idx + 1)).filter(i => i !== 1).concat([t.length])
        );
        return t.slice(idx + emoji.length, end).trim()

    }

    return {
        appearance: pick("💖") || t.split("\n")[0] || "Bugun zo‘r kayfiyatdasiz ✨",
        health: pick("🌿") || "Bugun ko‘proq suv iching 🌿",
        vitamin: pick("💊") || "C va D vitaminlari foydali bo‘lishi mumkin 💊",
        activity: pick("🚶") || "20-30 daqiqa sayr qiling 🚶",
    };
}