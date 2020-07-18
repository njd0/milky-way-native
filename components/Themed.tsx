import React, { useState } from 'react';
import { 
  Text as DefaultText, 
  View as DefaultView,
  Button as DefaultButton,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps & 
                          DefaultButton['props'] & 
                          TouchableOpacity['props'] &
                          { size?: string }

/*
* Themed Text Component
*/
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

/*
* Themed View Component
*/
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

/*
* Themed & Extended Button Component
*/
interface ISizeMap {
  sm: object;
  md: object;
  lg: object;
  [key: string]: object;
}
export function Button(props: ButtonProps) {
  const { title, style, color, size, lightColor, darkColor, onPress, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'highlight');

  // TODO add to button sizing styles or remove if not eventually used
  const sizeMap : ISizeMap = {
    'sm': {
      fontSize: 14
    },

    'md': {
      fontSize: 20
    },

    'lg': {
      fontSize: 28
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {backgroundColor},
        style,
      ]}
      {...otherProps}
    >
      <Text style={sizeMap[size || 'sm']}>{title}</Text>
      {props.children}
    </TouchableOpacity>
  );
}