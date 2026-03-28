import { motion } from "framer-motion";

const chatSteps = [
    { role: "user", text: "Alice, where are my keys?" },
    { role: "alice", text: "There is a wooden chair directly in front of you, about two steps away. You left your keys there earlier." },
    { role: "user", text: "Who am I talking to?" },
    { role: "alice", text: "You're speaking with George. He seems happy and is wearing a blue shirt." }
];

export default function AliceChatDemo() {
    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <div className="w-full rounded-2xl border border-[#1A2D33] bg-[#060A0C]/70 backdrop-blur-xl">
                <div className="px-8 pt-7 text-center">
                    <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/45">AuraVision</h3>
                </div>

                <div className="space-y-6 p-8 pt-6">
                    {chatSteps.map((chat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: chat.role === "user" ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.4, duration: 0.6 }}
                            className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`
            max-w-[80%] rounded-2xl p-4 text-sm md:text-base leading-relaxed
            ${chat.role === "user"
                            ? "bg-white/10 text-white border border-white/10"
                            : "bg-primary/10 text-primary border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(54,209,255,0.05)]"}
          `}>
                                <span className="block text-[10px] uppercase tracking-widest mb-1 opacity-50">
                                    {chat.role === "user" ? "You" : "Alice AI"}
                                </span>
                                {chat.text}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
