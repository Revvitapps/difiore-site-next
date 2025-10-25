// WIP — DiFiore Project Estimator (Next.js + Tailwind + Neon Glass Theme)
// This will replace the current vanilla JS estimator and include 6 project types

'use client';
import { useState } from 'react';
import EstimatorForm from '@/components/EstimatorForm';

export default function ProjectCalculatorPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0c0f14] via-[#0f1117] to-[#05070a] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-100 drop-shadow">Project Cost Estimator</h1>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Instantly estimate roofing, decks, kitchens, siding, bathrooms, and additions. Professionally modeled for local projects.
          </p>
        </div>

        <EstimatorForm onSubmitTo="difiorebuilders@gmail.com" />
      </div>
    </section>
  );
}