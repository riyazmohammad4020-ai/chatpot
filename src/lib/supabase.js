// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Get or Create Session ID for tracking Pari's responses
export function getOrCreateSessionId() {
  let sId = localStorage.getItem('pari_session_id');
  if (!sId) {
    sId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    localStorage.setItem('pari_session_id', sId);
  }
  return sId;
}

// Save selected answer for Questions 1-15 to Supabase
export async function saveAnswer(questionId, questionText, selectedAnswer) {
  const sessionId = getOrCreateSessionId();

  // LocalStorage Fallback Backup
  try {
    const existing = JSON.parse(localStorage.getItem('pari_answers_backup') || '{}');
    existing[`q_${questionId}`] = {
      questionId,
      questionText,
      selectedAnswer,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('pari_answers_backup', JSON.stringify(existing));
  } catch (e) {}

  if (!supabase) return;

  try {
    const { error } = await supabase
      .from('pari_responses')
      .insert([
        {
          session_id: sessionId,
          question_number: questionId,
          question_text: questionText,
          selected_answer: selectedAnswer,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.warn('Supabase saveAnswer warning:', error.message);
    }
  } catch (err) {
    console.warn('Supabase saveAnswer error:', err);
  }
}

// Save Anna Name from Slide 16 to Supabase
export async function saveAnnaName(annaName) {
  const sessionId = getOrCreateSessionId();

  try {
    localStorage.setItem('pari_fav_anna_name', annaName);
  } catch (e) {}

  if (!supabase) return;

  try {
    const { error } = await supabase
      .from('pari_responses')
      .insert([
        {
          session_id: sessionId,
          anna_name: annaName,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.warn('Supabase saveAnnaName warning:', error.message);
    }
  } catch (err) {
    console.warn('Supabase saveAnnaName error:', err);
  }
}

// Fetch grouped responses for Admin Dashboard
export async function fetchGroupedResponses() {
  if (!supabase) {
    // Return local backup data if Supabase is not configured yet
    try {
      const localAnswers = JSON.parse(localStorage.getItem('pari_answers_backup') || '{}');
      const localAnnaName = localStorage.getItem('pari_fav_anna_name') || '';
      const localSession = localStorage.getItem('pari_session_id') || 'local_session_1';

      if (Object.keys(localAnswers).length > 0 || localAnnaName) {
        return [
          {
            sessionId: localSession,
            annaName: localAnnaName,
            answers: localAnswers,
            createdAt: new Date().toISOString(),
            isLocalFallback: true
          }
        ];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  try {
    const { data, error } = await supabase
      .from('pari_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return [];
    }

    // Group rows by session_id
    const sessionsMap = {};
    (data || []).forEach(row => {
      const sId = row.session_id || 'unknown_session';
      if (!sessionsMap[sId]) {
        sessionsMap[sId] = {
          sessionId: sId,
          annaName: '',
          answers: {},
          createdAt: row.created_at
        };
      }

      if (row.annaName || row.anna_name) {
        sessionsMap[sId].annaName = row.annaName || row.anna_name;
      }

      if (row.question_number) {
        sessionsMap[sId].answers[`q_${row.question_number}`] = {
          questionId: row.question_number,
          questionText: row.question_text,
          selectedAnswer: row.selected_answer,
          timestamp: row.created_at
        };
      }
    });

    return Object.values(sessionsMap);
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return [];
  }
}
