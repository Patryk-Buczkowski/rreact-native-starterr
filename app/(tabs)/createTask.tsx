import { SafeAreaView, View } from "react-native";
import { Button, HelperText, SegmentedButtons, TextInput } from "react-native-paper";
import { createHabit } from "@/lib/appwrite";
import React from "react";
import { FrequencyType, HabitType } from "@/types/type_habit";
import { Formik } from "formik";
import * as Yup from "yup";

export default function CreateScreen() {
  const initialValues: HabitType = {
    user_id: "",
    description: "",
    frequency: "daily",
    last_completed: "never",
    streak_count: 0,
    title: "",
  };

  const handleCrateHabit = async (newTask: HabitType) => {
    try {
      await createHabit(newTask);
    } catch (error) {
      console.error("error", error);
    }
  };
  const frequencies: FrequencyType[] = ["daily", "weekly", "monthly"];
  const icons = ["calendar-today", "calendar-week", "calendar-month"];

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
    <View style={{padding:9}}>
        <Formik
          initialValues={initialValues}
          validateOnChange
          validationSchema={validationSchemaTask}
          onSubmit={(values, { resetForm }) => {
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
                style={{ marginBottom: 15 }}
              />
              {errors.title && (<HelperText type="error">{errors.title}</HelperText>)}
              <TextInput
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Type description for task"
                style={{ marginBottom: 15 }}
              />
              {errors.description && (<HelperText type="error">{errors.description}</HelperText>)}
              <SafeAreaView>
                <SegmentedButtons
                  style={{ marginBottom: 15 }}
                  value={values.frequency}
                  onValueChange={(val) => setFieldValue("frequency", val)}
                  buttons={frequencies.map((item, index) => ({
                    value: item,
                    label: item.charAt(0).toUpperCase() + item.slice(1),
                    icon: icons[index],
                  }))}
                />
              </SafeAreaView>
              <Button disabled={!values.description || !values.title} onPress={() => handleSubmit} mode="outlined">
                Add
              </Button>
            </>
          )}
        </Formik>
    </View>
  );
}
