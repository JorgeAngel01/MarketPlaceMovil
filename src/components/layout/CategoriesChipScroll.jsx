import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";

const CategoriesChipScroll = ({ data, onPress }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {Object.entries(data).map(([key, value]) => (
        <Chip
          key={key}
          icon="information"
          onPress={() => onPress(key)}
          style={[styles.chip, { marginLeft: key == 0 ? 0 : 10 }]}
        >
          {value}
        </Chip>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 50,
  },
  chip: {
    marginLeft: 10,
    height: 30,
  },
});

export default CategoriesChipScroll;
