// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Database, Clock, Sparkles, CheckCircle2, AlertCircle, UserCheck, ArrowLeft } from 'lucide-react';
import { fetchGroupedResponses, isSupabaseConfigured } from '../lib/supabase';
import { questions } from '../data/questions';

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const [selectedSessionIdx, setSelectedSessionIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchGroupedResponses();
    setResponses(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeResponse = responses[selectedSessionIdx] || null;
  const isSupabaseActive = isSupabaseConfigured();

  return (
    <div className="min-h-[100svh] w-full bg-slate-950 text-slate-100 p-4 py-8 select-none font-sans relative z-20">
      
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-rose-600/15 blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card-dark p-6 rounded-3xl border border-rose-400/30 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Pari's Surprise Admin</span>
                <Sparkles size={18} className="text-amber-300" />
              </h1>
              <p className="text-xs text-rose-200/70 font-medium">
                Live Answers & Responses from Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Status Badge */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
              isSupabaseActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {isSupabaseActive ? (
                <>
                  <CheckCircle2 size={13} />
                  <span>Supabase Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle size={13} />
                  <span>Local Fallback Mode</span>
                </>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadData}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>

            {/* Return to App Button */}
            <a
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to App</span>
            </a>
          </div>
        </div>

        {/* Sessions Tab Selector if multiple submissions exist */}
        {responses.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-rose-200/60 uppercase tracking-wider px-2">
              Submissions:
            </span>
            {responses.map((resp, idx) => (
              <button
                key={resp.sessionId || idx}
                onClick={() => setSelectedSessionIdx(idx)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 whitespace-nowrap ${
                  selectedSessionIdx === idx
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white border-rose-300 shadow-md shadow-rose-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-rose-200/70 border-white/10'
                }`}
              >
                <UserCheck size={13} />
                <span>{resp.annaName ? `Anna: "${resp.annaName}"` : `Session #${idx + 1}`}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Response Overview Content */}
        {isLoading ? (
          <div className="glass-card-dark p-12 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw size={24} className="animate-spin text-rose-400" />
            <p className="text-sm font-semibold text-rose-200">Loading Supabase responses...</p>
          </div>
        ) : !activeResponse ? (
          <div className="glass-card-dark p-12 rounded-3xl text-center space-y-3 border border-rose-400/20">
            <Database size={40} className="mx-auto text-rose-400/50" />
            <h3 className="text-lg font-bold text-white">No Responses Yet</h3>
            <p className="text-xs text-rose-200/70 max-w-sm mx-auto">
              When Pari plays the surprise app and selects answers, her chosen options and Anna name will be saved in Supabase and displayed here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Highlights Header Card */}
            <div className="glass-card-dark p-6 rounded-3xl border border-rose-400/30 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-xl">
              
              {/* Slide 16 Anna Name Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-purple-500/20 border border-rose-400/40 space-y-1">
                <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck size={14} className="text-rose-400" />
                  Slide 16 — Favourite Anna Name
                </span>
                <p className="text-2xl font-extrabold text-amber-200">
                  {activeResponse.annaName ? `"${activeResponse.annaName}"` : "Not answered yet"}
                </p>
              </div>

              {/* Timestamp Info */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 flex flex-col justify-center">
                <span className="text-xs font-semibold text-rose-200/70 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={14} className="text-rose-300" />
                  Submission Date & Time
                </span>
                <p className="text-base font-bold text-white font-mono">
                  {activeResponse.createdAt ? new Date(activeResponse.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  }) : 'Just now'}
                </p>
              </div>

            </div>

            {/* Questions 1 to 15 Answers Grid */}
            <div className="glass-card-dark p-6 rounded-3xl border border-rose-400/30 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>Questions 1–15 Answers</span>
                  <span className="text-xs font-mono text-rose-300 bg-rose-500/20 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                    {Object.keys(activeResponse.answers || {}).length} / 15 Answered
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {questions.map((q) => {
                  const saved = activeResponse.answers?.[`q_${q.id}`];
                  const hasAnswered = Boolean(saved);

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border transition-all ${
                        hasAnswered
                          ? 'bg-white/10 border-rose-400/40 shadow-md'
                          : 'bg-white/5 border-white/10 opacity-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold font-mono text-rose-300 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                          Q{String(q.id).padStart(2, '0')}
                        </span>
                        {hasAnswered && (
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 size={10} />
                            Answered
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-bold text-white leading-snug mb-3">
                        {q.question}
                      </p>

                      <div className="pt-1">
                        {hasAnswered ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/80 to-purple-600/80 text-white font-bold text-xs shadow-sm border border-rose-300">
                            <span>Selected:</span>
                            <span className="text-amber-200">{saved.selectedAnswer}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-white/40 italic">Not answered yet</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
