import { MessageCircleDashed } from 'lucide-react';

const NoChatSelected = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-base-100 select-none">
            
            {/* Icon */}
            <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MessageCircleDashed className="w-10 h-10 text-primary opacity-70" />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 rounded-3xl border border-primary/10" />
            </div>

            {/* Brand name */}
            <h1 
                className="text-3xl font-semibold text-base-content tracking-tight mb-2"
                style={{ fontFamily: "'Fraunces', serif" }}
            >
                BackChannel
            </h1>

            {/* Tagline */}
            <p className="text-sm text-base-content/50 max-w-[22ch] text-center leading-relaxed">
                Private conversations that disappear when you're done.
            </p>

            {/* Subtle divider with hint */}
            <div className="mt-10 flex items-center gap-3 text-base-content/30">
                <div className="w-8 h-px bg-base-content/20" />
                <span className="text-xs tracking-widest uppercase">select a chat to begin</span>
                <div className="w-8 h-px bg-base-content/20" />
            </div>

        </div>
    );
};

export default NoChatSelected;