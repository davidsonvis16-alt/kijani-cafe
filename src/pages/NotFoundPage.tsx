import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <p className="font-bebas text-[10rem] leading-none text-forest/10">404</p>
      <h1 className="font-bebas text-5xl text-forest tracking-wide -mt-10">This page wandered into the garden</h1>
      <Link to="/" className="inline-block mt-8 bg-ember text-white px-7 py-3.5 rounded-full font-extrabold">Back home</Link>
    </div>
  );
}
