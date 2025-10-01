import {
  SafeAreaView,
  View,
} from "react-native";
import {
  Button,
  HelperText,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import { createHabit, getHabits } from "@/lib/appwrite";
import React from "react";
import { FrequencyType, HabitType } from "@/types/type_habit";
import { Formik } from "formik";
import * as Yup from "yup";
import KeyboardWrapper from "../components/keyboardWrapper";

export default function CreateScreen() {
  const initialValues: Partial<HabitType> = {
    user_id: "",
    description: "",
    frequency: "daily",
    last_completed: "never",
    streak_count: 0,
    title: "",
  };

  const handleCrateHabit = async (newTask: Partial<HabitType>) => {
    try {
      await createHabit(newTask);
      await getHabits();
    } catch (error) {
      console.error("error", error);
    }
  };
  const frequencies: FrequencyType[] = ["daily", "weekly", "monthly"];
  const iconsFrequencies = [
    "calendar-today",
    "calendar-week",
    "calendar-month",
  ];

  const validationSchemaTask = Yup.object().shape({
    description: Yup.string()
      .required("description is required")
      .min(5, "description must have at lest 5 characters"),
    frequency: Yup.string()
      .oneOf(frequencies, `Frequency must be one of: ${frequencies.join(", ")}`)
      .required("frequency is requed"),
    title: Yup.string()
      .min(5, "Min title length 5 characters")
      .required("Title is requires"),
  });

  return (
    <KeyboardWrapper style={{ flex: 1, backgroundColor: "#000428" }}>
      <View style={{ padding: 12 }}>
        <Formik
          initialValues={initialValues}
          validateOnChange
          validationSchema={validationSchemaTask}
          onSubmit={async (values, { resetForm }) => {
            handleCrateHabit(values);
            resetForm();
          }}
        >
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                aria-label="title"
                placeholder="Type task title"
                placeholderTextColor={"#A5B4FC"}
                style={{
                  marginBottom: 15,
                  backgroundColor: "#000BB0",
                  borderRadius: 8,
                }}
                textColor="#E0E7FF"
                right={<TextInput.Icon icon="format-title" color={"#C7D2FE"} />}
              />
              {touched.title && errors.title && (
                <HelperText type="error">{errors.title}</HelperText>
              )}

              <TextInput
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Type description for task"
                placeholderTextColor={"#A5B4FC"}
                style={{
                  marginBottom: 15,
                  backgroundColor: "#000BB0",
                  borderRadius: 8,
                }}
                textColor="#E0E7FF"
                right={<TextInput.Icon icon="note-text" color={"#C7D2FE"} />}
              />
              {touched.description && errors.description && (
                <HelperText type="error">{errors.description}</HelperText>
              )}

              <SafeAreaView>
                <SegmentedButtons
                  style={{ marginBottom: 15 }}
                  value={values.frequency || "daily"}
                  theme={{
                    colors: {
                      secondaryContainer: "#000BB0",
                      onSecondaryContainer: "#E0E7FF",
                    },
                  }}
                  onValueChange={(val) => setFieldValue("frequency", val)}
                  buttons={frequencies.map((item, index) => ({
                    value: item,
                    label: item.charAt(0).toUpperCase() + item.slice(1),
                    icon: iconsFrequencies[index],
                  }))}
                />
              </SafeAreaView>

              <Button
                disabled={!values.description || !values.title}
                onPress={() => handleSubmit()}
                mode="contained"
                style={{
                  backgroundColor: "#4D5DFA",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#E0E7FF", fontWeight: "600" }}
              >
                Add Task
              </Button>
            </>
          )}
        </Formik>
      </View>
    </KeyboardWrapper>
  );
}
