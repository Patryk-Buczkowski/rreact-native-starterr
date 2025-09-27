export type HabitType = {
  user_id: string;
  title: string;
  description: string;
  streak_count: number;
  last_completed: string | null;
  frequency: FrequencyType;
  $createdAt?: string;
  $updatedAt?: string;
};

export type FrequencyType = "daily" | "weekly" | "monthly";