import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  coords: string;
  key?: string;
  isLit: boolean;
  handlePress(coords: string): void;
}

const Cell: React.FC<Props> = ({ isLit, coords, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(coords);
      }}
    >
      <View
        style={{ ...styles.cell, backgroundColor: isLit ? "purple" : "gray" }}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    height: 50,
    width: 50,
    margin: 5
  }
});

export default Cell;
