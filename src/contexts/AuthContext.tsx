import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { User } from '../types';
import { STORAGE_KEYS } from '../data/site';
import { load, save, remove } from '../lib/storage';
import { uid, normaliseKePhone } from '../lib/format';

// Front-end only accounts, stored in this browser. Swap these calls for a real auth backend
// (Firebase, Supabase, Clerk, or a custom API) before taking real customer data.

interface StoredAccount extends User {
  passwordHash: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (login: string, password: string) => Promise<void>;
  signUp: (data: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  signOut: () => void;
  updateUser: (patch: Partial<Omit<User, 'id'>>) => void;
  toggleFavourite: (itemId: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function hash(password: string) {
  const bytes = new TextEncoder().encode(`kijani:${password}`);
  if (!window.crypto?.subtle) return btoa(password);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

const strip = ({ passwordHash: _ignored, ...user }: StoredAccount): User => user;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<StoredAccount[]>(() => load(STORAGE_KEYS.accounts, []));
  const [sessionId, setSessionId] = useState<string | null>(() => load(STORAGE_KEYS.session, null));

  useEffect(() => save(STORAGE_KEYS.accounts, accounts), [accounts]);
  useEffect(() => (sessionId ? save(STORAGE_KEYS.session, sessionId) : remove(STORAGE_KEYS.session)), [sessionId]);

  const value = useMemo<AuthContextValue>(() => {
    const current = accounts.find((a) => a.id === sessionId) ?? null;

    const patchCurrent = (fn: (a: StoredAccount) => StoredAccount) =>
      setAccounts((prev) => prev.map((a) => (a.id === sessionId ? fn(a) : a)));

    return {
      user: current ? strip(current) : null,

      async signIn(login, password) {
        const needle = login.trim().toLowerCase();
        const phone = normaliseKePhone(login);
        const acct = accounts.find((a) => a.email === needle || (phone && a.phone === phone));
        if (!acct || acct.passwordHash !== (await hash(password))) {
          throw new Error('That email/phone and password don’t match.');
        }
        setSessionId(acct.id);
      },

      async signUp({ name, email, phone, password }) {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = normaliseKePhone(phone);
        if (!name.trim()) throw new Error('Please tell us your name.');
        if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error('Please enter a valid email address.');
        if (!cleanPhone) throw new Error('Please enter a valid Kenyan mobile number, e.g. 0712 345 678.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');
        if (accounts.some((a) => a.email === cleanEmail || a.phone === cleanPhone)) {
          throw new Error('An account with that email or phone already exists. Try signing in.');
        }
        const acct: StoredAccount = {
          id: uid('U'),
          name: name.trim(),
          email: cleanEmail,
          phone: cleanPhone,
          points: 0,
          favourites: [],
          addresses: [],
          createdAt: Date.now(),
          passwordHash: await hash(password),
        };
        setAccounts((prev) => [...prev, acct]);
        setSessionId(acct.id);
      },

      signOut: () => setSessionId(null),

      updateUser: (patch) => patchCurrent((a) => ({ ...a, ...patch })),

      toggleFavourite(itemId) {
        if (!current) return false;
        const has = current.favourites.includes(itemId);
        patchCurrent((a) => ({
          ...a,
          favourites: has ? a.favourites.filter((f) => f !== itemId) : [...a.favourites, itemId],
        }));
        return !has;
      },
    };
  }, [accounts, sessionId]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
