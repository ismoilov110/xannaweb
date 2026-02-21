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
        // Fix: using i !== -1 to find the next emoji
        const endPositions = others
            .map(e => t.indexOf(e, idx + 1))
            .filter(i => i !== -1);

        const end = endPositions.length > 0
            ? Math.min(...endPositions)
            : t.length;

        return t.slice(idx + emoji.length, end).trim()
    }

    const appearance = pick("💖");
    const health = pick("🌿");
    const vitamin = pick("💊");
    const activity = pick("🚶");

    return {
        appearance: appearance || t.split("\n")[0] || "O‘zingizni asrang, siz har doim go‘zalsiz ✨",
        health: health || "Bugun ko‘proq suv iching va dam oling 🌿",
        vitamin: vitamin || "Sizga kerakli vitaminlarni tabiatdan izlang 💊",
        activity: activity || "Bugun kamida 30 daqiqa piyoda yurish foydali 🚶",
    };
}
