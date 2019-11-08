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
      style={{
        ...styles.cell,
        backgroundColor: isLit ? "#fffd61" : "#aeaeae"
      }}
      onPress={() => {
        handlePress(coords);
      }}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    margin: 2
  }
});

export default Cell;
