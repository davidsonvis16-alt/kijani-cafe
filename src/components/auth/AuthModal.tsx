import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Heart, Zap, Loader2, Eye, EyeOff } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../layout/Logo';

const PERKS = [
  { icon: Gift, text: 'Earn Kijani points on every order' },
  { icon: Zap, text: 'Faster checkout & one-tap reorder' },
  { icon: Heart, text: 'Save your favourite dishes' },
];

export function AuthModal() {
  const { authView, closeAuth, openAuth, toast } = useUI();
  const { signIn, signUp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', login: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const isSignup = authView === 'signup';
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (isSignup) {
        await signUp(form);
        toast(`Karibu, ${form.name.split(' ')[0]}! Your account is ready.`);
      } else {
        await signIn(form.login, form.password);
        toast('Welcome back!');
      }
      setForm({ name: '', email: '', phone: '', password: '', login: '' });
      closeAuth();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const input = 'w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest';

  return (
    <AnimatePresence>
      {authView && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={isSignup ? 'Create account' : 'Sign in'}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={closeAuth} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-paper rounded-[2rem] overflow-hidden grid md:grid-cols-2 shadow-2xl max-h-[92vh]"
          >
            <button onClick={closeAuth} aria-label="Close" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-forest/5 hover:bg-forest/10 grid place-items-center">
              <X className="w-5 h-5" />
            </button>

            <div className="hidden md:flex relative bg-forest text-cream p-10 flex-col justify-between overflow-hidden">
              <img src="/exterior-lawn-outdoor-seating.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />
              <div className="relative"><Logo light /></div>
              <div className="relative">
                <h2 className="font-bebas text-6xl leading-[0.9] tracking-wide">
                  Join the<br /><span className="text-leaf">Kijani family</span>
                </h2>
                <ul className="mt-6 space-y-3">
                  {PERKS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm font-semibold">
                      <span className="w-8 h-8 rounded-full bg-leaf/20 text-leaf grid place-items-center"><Icon className="w-4 h-4" /></span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-7 sm:p-10 overflow-y-auto">
              <h2 className="font-bebas text-4xl tracking-wide text-forest">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
              <p className="text-sm text-ink/60 mt-1 mb-6">
                {isSignup ? 'It takes 30 seconds. Promise.' : 'Sign in to order faster and collect points.'}
              </p>

              <form onSubmit={submit} className="space-y-3" noValidate>
                {isSignup ? (
                  <>
                    <input className={input} placeholder="Full name" autoComplete="name" value={form.name} onChange={set('name')} required />
                    <input className={input} placeholder="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
                    <input className={input} placeholder="Phone (07XX XXX XXX)" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} required />
                  </>
                ) : (
                  <input className={input} placeholder="Email or phone" autoComplete="username" value={form.login} onChange={set('login')} required />
                )}
                <div className="relative">
                  <input
                    className={input + ' pr-12'}
                    placeholder="Password"
                    type={showPw ? 'text' : 'password'}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    value={form.password}
                    onChange={set('password')}
                    required
                  />
                  <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-ink/50">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && <p className="text-sm text-ember font-semibold" role="alert">{error}</p>}

                <button disabled={busy} className="w-full bg-forest hover:bg-forest-2 text-leaf rounded-full py-3.5 font-extrabold text-sm flex items-center justify-center gap-2">
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSignup ? 'Create account' : 'Sign in'}
                </button>
              </form>

              <p className="text-sm text-center text-ink/60 mt-6">
                {isSignup ? 'Already have an account?' : 'New to Kijani?'}{' '}
                <button
                  onClick={() => {
                    setError('');
                    openAuth(isSignup ? 'signin' : 'signup');
                  }}
                  className="font-extrabold text-kijani hover:underline"
                >
                  {isSignup ? 'Sign in' : 'Create an account'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
