import { Bot, ShieldCheck, Users } from "lucide-react";

export default function TrustBadges() {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-20 mt-[-2rem] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                        <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">AI Powered</h3>
                    <p className="text-sm text-slate-400">Built using Google Gemini AI</p>
                </div>

                <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">Conservative Strategy</h3>
                    <p className="text-sm text-slate-400">Low-risk, diversified recommendations only</p>
                </div>

                <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">Built for Indian GenZ</h3>
                    <p className="text-sm text-slate-400">Tailored for students and first-time earners</p>
                </div>
            </div>
        </section>
    );
}
