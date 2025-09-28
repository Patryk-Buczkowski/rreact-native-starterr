import {
  Account,
  Client,
  Databases,
  ID,
  TablesDB,
} from "react-native-appwrite";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { AppConfigExtra } from "@/env";
import { HabitType } from "@/types/type_habit";
import useTasksStore from "../zustand/useTasksStore";

const { clearAllTasks, deleteTask, setTasks, tasks, updateTask } =
  useTasksStore.getState();

const extra = Constants.expoConfig?.extra as AppConfigExtra;

const APPWRITE_PROJECT_ID = extra.APPWRITE_PROJECT_ID;
const APPWRITE_ENDPOINT = extra.APPWRITE_ENDPOINT;
const APPWRITE_PLATFORM = extra.APPWRITE_PLATFORM;
const WEB_CLIENT_ID = extra.WEB_CLIENT_ID;
const DB_ID = extra.DB_ID;

console.log("constans db id", DB_ID);

export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setPlatform(APPWRITE_PLATFORM);

export const account = new Account(client);
const tables = new TablesDB(client);

export const createHabit = async (data: Partial<HabitType>) => {
  const currentUser = await account.get();
  try {
    const row = await tables.createRow({
      databaseId: DB_ID,
      tableId: "habits",
      rowId: ID.unique(),
      data: {
        user_id: `${currentUser.name} - ${currentUser.$id}`,
        title: data.title,
        description: data.description,
        streak_count: 0,
        last_completed: data.last_completed, //type string
        frequency: data.frequency,
      },
      permissions: [
        'read("any")',
        `update("user:${currentUser.$id}")`,
        `delete("user:${currentUser.$id}")`,
      ],
    });

    console.log("Row created:", row);
  } catch (error) {
    console.error("Error creating habit:", error);
  }
};

export const getHabits = async () => {
  try {
    const response = await tables.listRows<HabitType>({
      databaseId: DB_ID,
      tableId: "habits",
    });
    setTasks(response.rows);
    console.log('tasks', tasks.length)
  } catch (error) {
    console.error("Error in fetching tasks", error);
  }
};

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
  scopes: ["https://www.googleapis.com/auth/drive"],
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});
