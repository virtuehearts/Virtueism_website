"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Award, Globe, Mail, Phone, Printer, Sparkles, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Practitioner {
  name: string | null;
  email: string;
  website: string | null;
  whatsapp: string | null;
  bio: string | null;
  certificateNumber: string;
  certificateDate: string | null;
  type: string;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function CertificatePage() {
  const params = useParams();
  const number = params.number as string;
  const [user, setUser] = useState<Practitioner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (number) {
      fetch(`/api/certificates/${number}`)
        .then(res => {
          if (!res.ok) throw new Error("Certificate not found");
          return res.json();
        })
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [number]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0720] flex items-center justify-center text-accent">
        <Loader2 className="animate-spin mr-2" />
        Verifying Certificate...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#0d0720] flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="text-red-400 mb-4" size={64} />
        <h1 className="text-3xl font-serif text-white mb-2">Invalid Certificate</h1>
        <p className="text-violet-200/60 mb-8 max-w-md">
          The certificate number you entered could not be verified. Please check the number and try again.
        </p>
        <Link href="/" className="bg-accent text-background px-8 py-3 rounded-full font-bold">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0720] py-12 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center print:hidden">
          <Link href="/" className="text-violet-200 hover:text-white transition-colors flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-500">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span>Back to Virtueism.org</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-accent text-background px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all"
          >
            <Printer size={18} />
            Print Certificate
          </button>
        </div>

        {/* Certificate Border Container */}
        <div className="relative bg-white text-[#0d0720] p-8 md:p-16 rounded-sm shadow-2xl border-[16px] border-[#d4af37] overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)]" />
          </div>

          <div className="relative border-4 border-[#d4af37]/30 p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="flex flex-col items-center">
              <Award className="text-[#d4af37] mb-4" size={80} />
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-widest uppercase text-[#8b6d11]">
                Certificate of Completion
              </h1>
              <div className="w-48 h-1 bg-[#d4af37] mt-4" />
            </div>

            <div className="space-y-4">
              <p className="text-xl md:text-2xl italic font-serif">This is to certify that</p>
              <h2 className="text-3xl md:text-5xl font-bold font-serif border-b-2 border-black/10 pb-2 px-8 inline-block">
                {user.name || "A Dedicated Practitioner"}
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <p className="text-lg md:text-xl leading-relaxed">
                has successfully completed the intensive Reiki Training program and reached the level of
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-[#8b6d11] uppercase tracking-wider">
                {user.type === 'LEVEL1' && "Reiki Level 1 Practitioner"}
                {user.type === 'LEVEL2' && "Reiki Level 2 Practitioner"}
                {user.type === 'MASTER' && "Reiki Master Practitioner"}
                {user.type === 'ALLURE' && "Allure Reiki Practitioner"}
              </h3>
              <p className="text-lg md:text-xl">
                guided by <span className="font-bold">Baba Virtuehearts</span>.
              </p>
            </div>

            <div className="w-full pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full border-b border-black/40 pb-2">
                  <p className="font-serif italic text-xl">Baba Virtuehearts</p>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-black/60">Founder & Master Teacher</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full border-b border-black/40 pb-2">
                  <p className="font-serif text-xl">{formatDate(user.certificateDate)}</p>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-black/60">Date of Completion</p>
              </div>
            </div>

            <div className="pt-8 text-sm text-black/40 font-mono uppercase">
              Verification Code: {user.certificateNumber}
            </div>
          </div>
        </div>

        {/* Practitioner Info Section (Non-printable) */}
        <div className="bg-white/5 border border-violet-500/20 p-8 rounded-2xl space-y-6 print:hidden">
          <h3 className="text-2xl font-serif text-accent">Practitioner Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {user.bio && (
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-accent font-bold">About the Practitioner</p>
                  <p className="text-violet-100/80 leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-accent font-bold">Contact Details</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-violet-100/80">
                  <Mail className="text-accent" size={18} />
                  <span>{user.email}</span>
                </li>
                {user.website && (
                  <li className="flex items-center gap-3 text-violet-100/80">
                    <Globe className="text-accent" size={18} />
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline underline-offset-4">
                      {user.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
                {user.whatsapp && (
                  <li className="flex items-center gap-3 text-violet-100/80">
                    <Phone className="text-accent" size={18} />
                    <span>{user.whatsapp}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
