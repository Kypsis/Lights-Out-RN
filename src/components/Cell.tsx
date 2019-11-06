import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {}

const Cell: React.FC<Props> = () => {
  return <View style={styles.Cell}></View>;
};

const styles = StyleSheet.create({
  Cell: {
    height: 50,
    width: 50,
    margin: 5,
    backgroundColor: "purple"
  }
});

export default Cell;
