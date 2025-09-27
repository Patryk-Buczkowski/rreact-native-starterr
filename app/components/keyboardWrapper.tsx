import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function KeyboardWrapper({ children, style }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[{ flex: 1, justifyContent: "center" }, style]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
