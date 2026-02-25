"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function CertificateLookup() {
  const [certNumber, setCertNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;

    setLoading(true);
    router.push(`/certificates/${certNumber.trim()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleLookup} className="relative group">
        <input
          type="text"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          placeholder="Enter Certificate Number (e.g. VH-2025-ABCD)"
          className="w-full bg-violet-500/10 border border-violet-400/30 rounded-full px-6 py-4 pl-12 text-violet-100 placeholder:text-violet-100/40 focus:border-violet-400 outline-none transition-all group-hover:border-violet-400/50"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400/60 group-hover:text-violet-400 transition-colors" size={20} />
        <button
          type="submit"
          disabled={loading || !certNumber.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify"}
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-violet-100/40 uppercase tracking-widest">
        Official Virtuehearts Practitioner Verification
      </p>
    </div>
  );
}
