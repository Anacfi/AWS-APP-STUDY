import { supabase } from './supabaseClient'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*, lessons(*)')
    .order('order_index')
    .order('order_index', { foreignTable: 'lessons' })
  if (error) throw error

  return data.map((c) => ({
    id: c.id,
    label: c.label,
    short: c.short,
    topicsCompleted: c.topics_completed,
    topicsTotal: c.topics_total,
    percent: c.percent,
    lessons: c.lessons.map((l) => ({ title: l.title, minutes: l.minutes, status: l.status })),
  }))
}

export async function getFlashcards() {
  const { data, error } = await supabase.from('flashcards').select('*').order('id')
  if (error) throw error
  return data
}

export async function getQuestions() {
  const { data, error } = await supabase.from('questions').select('*').order('id')
  if (error) throw error
  return data
}

export async function getProfile() {
  const { data, error } = await supabase.from('profile').select('*').eq('id', 1).single()
  if (error) throw error
  return {
    targetCertCode: data.target_cert_code,
    examDate: data.exam_date,
    weeklyGoalHours: data.weekly_goal_hours,
    reminderTime: data.reminder_time,
  }
}

export async function updateProfile(updates) {
  const payload = {}
  if (updates.targetCertCode !== undefined) payload.target_cert_code = updates.targetCertCode
  if (updates.examDate !== undefined) payload.exam_date = updates.examDate
  if (updates.weeklyGoalHours !== undefined) payload.weekly_goal_hours = updates.weeklyGoalHours
  if (updates.reminderTime !== undefined) payload.reminder_time = updates.reminderTime

  const { error } = await supabase.from('profile').update(payload).eq('id', 1)
  if (error) throw error
}
