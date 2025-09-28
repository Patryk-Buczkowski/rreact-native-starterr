import { Models } from "react-native-appwrite";

export interface HabitType extends Models.DefaultRow {
  user_id: string;
  title: string;
  description: string;
  streak_count: number;
  last_completed: string | null;
  frequency: FrequencyType;
};

export type FrequencyType = "daily" | "weekly" | "monthly";