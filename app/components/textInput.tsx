import { TextInput } from "react-native-paper";
import { TextInputFocusEventData } from "react-native/Libraries/Components/TextInput/TextInput";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";

type Props = {
  values: string;
  onChangeText: ((text: string) => void) & Function;
  onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
    ((args: any) => void);
  placeholder: string;
  placeholderTextColor: string,
  icon: React.ReactNode,
  style: StyleProp<TextStyle>
};

export default function CustomTextInput({
  values,
  placeholder,
  placeholderTextColor,
  onChangeText,
  onBlur,
  icon,
  style
}: Props) {
  return (
    <TextInput
      value={values}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={style}
      right={icon}
    />
  );
}
