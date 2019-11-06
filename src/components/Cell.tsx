import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  coords: any;
  key?: any;
  isLit: any;
  handlePress: any;
}

const Cell: React.FC<Props> = ({ isLit, coords, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(coords);
      }}
    >
      <View
        style={{ ...styles.Cell, backgroundColor: isLit ? "purple" : "gray" }}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Cell: {
    height: 50,
    width: 50,
    margin: 5
  }
});

export default Cell;
