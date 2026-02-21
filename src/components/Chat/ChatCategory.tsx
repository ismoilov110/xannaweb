import { styles } from "@/Styles/Styles";
import { type CategoriesType, type Message } from "@/Types/Types";
import { ArrowLeft, BookOpen, ChefHat, Heart, Lightbulb, MapPin, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startChat, sendMassege } from "@/Services/AiChat/AiChat.services";

export default function ChatCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const cid = Number(categoryId)
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<number | null>(null)

  const Chatcategories: CategoriesType = {
    cooking: {
      titles: "Qanday ovqat qilish",
      icon: ChefHat,
      color: "#FF6B35",
      greeting: "Salom! Men sizga mazali retseptlar va ovqat tayyorlash bo'yicha maslahat beraman. Qanday taom tayyorlashni xohlaysiz?",
    },
    places: {
      titles: "Kechgi sayrga qayerga borish",
      icon: MapPin,
      color: "#4A90E2",
      greeting: "Salom! Kechgi sayr uchun eng yaxshi joylarni topishda yordam beraman. Qaysi shahardasan va qanday muhit yoqadi?",
    },
    lifehacks: {
      titles: "Foydali lifehack",
      icon: Lightbulb,
      color: "#F59E0B",
      greeting: "Salom! Kundalik hayotni osonlashtiruvchi maslahatlar beraman. Qaysi sohada yordam kerak?",
    },
    books: {
      titles: "Qanday kitob o'qish",
      icon: BookOpen,
      color: "#10B981",
      greeting: "Salom! Sizga eng zo'r kitoblarni tavsiya qilaman. Qanday janr yoqadi yoki qaysi mavzuda kitob qidiryapsiz?",
    },
    selfcare: {
      titles: "O'ziga qarash bo'yicha maslahat",
      icon: Heart,
      color: "#EC4899",
      greeting: "Salom! Go'zallik va salomatlik sirlari haqida gaplashaylik. Bugun sizga qanday yordam bera olaman?",
    },
  };

  const currentCategory =
    Chatcategories[categoryId || "cooking"] || Chatcategories.cooking;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: currentCategory.greeting,
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const IconComponent = currentCategory.icon;

  // Auto scroll to bottom
  useEffect(() => {
    if (!cid || Number.isNaN(cid)) return; // bu yerda categoryId ni tekshiramiz

    // Chatni boshlash va conversationId ni olish
    (async () => {
      try {
        const data = await startChat(cid);
        setConversationId(data.conversation ? data.conversation.id : null); // Backend'dan conversation ob'ekti va uning ichida id kelmoqda.
        // setConversationId()
        // Agar backend old massages ni yuborsa, ularni chatgan qo'shamiz, bu odatda chatni boshlashda bitta xabardan iborat bo'ladi, u ham backend tomonidan yaratilgan va foydalanuvchiga salomlashish uchun ishlatiladi.
        if (data.messages?.length) {
          setMessages(
            data.messages.map((m, index) => ({
              id: Date.now() + index,
              text: m.content,
              isUser: m.role === "user",
              timestamp: new Date(m.created_at || m.timestamp || "")
            })))
        }
      } catch (e: any) {
        const status = e?.response?.status;
        const redirect = e?.response?.data?.redirect;

        // Agar status 403 bo'lsa va backend redirect URL yuborsa, biz foydalanuvchini o'sha URL ga yo'naltiramiz, bu odatda login sahifasi bo'ladi.
        if (status === 403 && redirect) {
          navigate(redirect)
          return;
        }
        if (status === 401) {
          navigate("/login")
          return;
        }
        console.error(e)
      }
    })()
  }, [cid, navigate])

  const handleSend = async () => {
    const text = inputValue.trim(); // inputdagi bosh joylarni olib tashlaymiz
    if (!text) return; // agar input bosh bolsa, hech narsa yubormaymiz
    if (!conversationId) {
      console.error("Conversation ID olinmagan, xabar yuborilmayapti.");
      return;
    } // agar conversationId hali olinmagan bolsa,xabar yubormaymiz.

    // foydalanuchi xabarini chatga qoshamiz
    const UserMessage: Message = {
      id: Date.now(), // 
      text,
      isUser: true,
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, UserMessage]);
    setInputValue(""); // inputni tozalaymiz
    setIsTyping(true); // AI javob yozayotganini korsatamiz

    try {
      const res = await sendMassege(cid, conversationId, text); // bu yerda biz backendga categoryId, conversationId va xabar matni bilan so'rov yuboramiz va AI javobini olamiz

      const AiMessage: Message = {
        id: Date.now() + 1,
        text: res.assistant_message.content,
        isUser: false,
        timestamp: new Date(res.assistant_message.created_at)
      };

      setMessages((prev) => [...prev, AiMessage]); // AI javbini chatga qoshamiz
    } catch (e: any) {
      const status = e?.response?.status;
      const redirect = e?.response?.status;

      if (status === 403 && redirect) {
        navigate(redirect);
        return
      }
      if (status === 401) {
        navigate("/login");
        return
      }

      console.error(e);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Kechirasiz, xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false) // AI javob yozishni tugatdik, typing indikatorini o'chiramiz
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className={`${styles.container} py-4`}>
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>

            {/* Category Icon & Title */}
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: `${currentCategory.color}20` }}
              >
                <IconComponent
                  size={24}
                  style={{ color: currentCategory.color }}
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {currentCategory.titles}
                </h1>
                <p className="text-sm text-gray-500">XANNA maslahatchisi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32">
        <div className={styles.container}>
          <div className="max-w-3xl mx-auto space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] ${message.isUser
                    ? "bg-linear-to-r from-pink-500 to-rose-400 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                    } rounded-2xl px-4 py-3 shadow-sm`}
                >
                  {!message.isUser && (
                    <div
                      className="w-8 h-8 rounded-full mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${currentCategory.color}20` }}
                    >
                      <IconComponent
                        size={16}
                        style={{ color: currentCategory.color }}
                      />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <span
                    className={`text-xs mt-1 block ${message.isUser
                      ? "text-pink-100"
                      : "text-gray-400"
                      }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className={`${styles.container} py-4`}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(),
                      handleSend()
                  }
                }}

                placeholder="Xabar yozing..."
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 rounded-full cursor-pointer transition-all disabled:opacity-40"
                style={{
                  backgroundColor: inputValue.trim()
                    ? currentCategory.color
                    : "#E5E7EB",
                }}
              >
                <Send
                  size={20}
                  className={inputValue.trim() ? "text-white" : "text-gray-400"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}