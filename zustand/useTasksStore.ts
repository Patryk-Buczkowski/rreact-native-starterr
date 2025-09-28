import { HabitType } from "@/types/type_habit";
import { create } from "zustand";

type TaskType = {
  tasks: HabitType[];
  setTasks: (tasks: HabitType[]) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: HabitType) => void;
  clearAllTasks: () => void;
};

const useTasksStore = create<TaskType>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.$id !== id),
    })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.$id === task.$id ? task : t)),
    })),
  clearAllTasks: () => set({ tasks: [] }),
}));

export default useTasksStore;
