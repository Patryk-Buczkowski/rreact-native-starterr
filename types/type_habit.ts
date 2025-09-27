export type Habit = {
  $id?: string;
  user_id: string;
  title: string;
  description: string;
  streak_count: number;
  last_completed: string | null;
  frequency: "daily" | "weekly" | "monthly";
  created_at?: string;
  $createdAt?: string;
  $updatedAt?: string;
};