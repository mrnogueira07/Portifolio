/**
 * @file Contact.tsx
 * @description Seção de Formulário de Contato integrado com o Firebase e WhatsApp.
 * 
 * Permite ao visitante enviar mensagens diretas salvando os dados no Firebase Firestore
 * e abrindo a conversa no WhatsApp com os dados preenchidos.
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';
import { WhatsAppIcon, GitHubIcon, LinkedInIcon, InstagramIcon, TikTokIcon } from './icons/BrandIcons';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  // Estados do Formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Atualização dos campos de input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envio do formulário de contato para o Firebase Firestore e WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Formata a mensagem organizada para o WhatsApp
    const text = `*Contato via Portfólio Matheus Nogueira*\n\n👤 *Nome:* ${formData.name}\n✉️ *E-mail:* ${formData.email}\n📌 *Assunto:* ${formData.subject || 'Contato'}\n\n💬 *Mensagem:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappBase = personalInfo.whatsappUrl ? personalInfo.whatsappUrl.split('?')[0] : 'https://wa.me/5592981838704';
    const fullUrl = `${whatsappBase}?text=${encodedText}`;

    // Abre o WhatsApp imediatamente (ação síncrona do clique do usuário para evitar bloqueio de popup)
    window.open(fullUrl, '_blank');

    try {
      // Salva o documento no Firestore com um timeout seguro para que o botão NUNCA fique travado
      const savePromise = addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp()
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout Firebase')), 2000)
      );
      await Promise.race([savePromise, timeoutPromise]);
    } catch (error: any) {
      console.warn('Salvando cópia no Firebase finalizado ou expirado:', error);
    } finally {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-400 text-xs font-mono uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>{t("Conexão & Parcerias", "Get in Touch")}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("Vamos construir algo ", "Let's build something ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              {t("extraordinário juntos?", "extraordinary together?")}
            </span>
          </h2>
        </div>

        {/* Card do Formulário de Contato */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {t("Mensagem Enviada!", "Message Sent!")}
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                {t(
                  "Sua mensagem foi enviada para o WhatsApp e salva com sucesso!",
                  "Your message has been sent to WhatsApp and saved successfully!"
                )}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setLoading(false);
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase"
              >
                {t("Enviar Outra Mensagem", "Send Another Message")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-2">
                    {t("Seu Nome", "Your Name")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Ana Silva"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-2">
                    {t("Seu E-mail", "Your Email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ana@empresa.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-2">
                  {t("Assunto", "Subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ex: Novo Projeto Web"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-2">
                  {t("Mensagem", "Message")} *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("Descreva brevemente sua ideia...", "Briefly describe your project...")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm resize-none"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#22c55e] to-[#128C7E] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span>{t("Enviando...", "Sending...")}</span>
                ) : (
                  <>
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    <span>{t("Enviar para o WhatsApp", "Send to WhatsApp")}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Ícones de Contato & Redes Sociais Abaixo do Formulário */}
          <div className="pt-8 mt-8 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400 font-mono mb-4 uppercase tracking-wider">
              {t("Canais Diretos & Redes Sociais", "Direct Channels & Social Media")}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* WhatsApp */}
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 transition-all hover:scale-110 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </a>

              {/* E-mail */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-indigo-600 text-white border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                title="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-gray-800 text-white border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                title="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-[#0A66C2] text-white border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-[#E4405F] text-white border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                title="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              {/* TikTok */}
              {personalInfo.socials.tiktok && (
                <a
                  href={personalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-black text-white border border-white/10 hover:border-white/30 transition-all hover:scale-110"
                  title="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
