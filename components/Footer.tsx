import { AlertTriangle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-slate-900/90">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex gap-4 items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-yellow-500 mb-2">Important Disclaimer</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            This platform provides AI-generated educational insights and does not constitute financial advice.
                            The recommendations are generated for educational purposes based on conservative investing principles.
                            Always consult a certified financial advisor before making any investment decisions. Investments are
                            subject to market risks; read all related documents carefully before investing.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} SafeNest AI. All rights reserved.</p>
                    <p>Built for Indian GenZ Investors.</p>
                </div>
            </div>
        </footer>
    );
}
