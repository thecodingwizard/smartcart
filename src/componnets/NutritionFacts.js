import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

function isIndented(str) {
  switch (str.toLowerCase()) {
    case 'saturated fat':
    case 'trans fat':
    case 'dietary fiber':
    case 'sugar':
    case 'sugars':
      return true;
    default:
      return false;
  }
}

const renderItem = ({ item }) => (
  <View style={style.nutritionFactsItem}>
    <Text
      style={{
        flex: 3,
        fontWeight: '900',
        ...(isIndented(item.name) ? style.nutritionFactsUnbold : {}),
      }}
    >
      {(isIndented(item.name) ? '        ' : '') + item.name}
    </Text>
    <Text style={{ flex: 1 }}>{item.amount}</Text>
    {/*<Text style={{ flex: 1 }}>*/}
    {/*{item.percent.length > 0 && item.percent + '%'}*/}
    {/*</Text>*/}
  </View>
);

const NutritionFacts = props => (
  <View style={style.nutritionFacts}>
    <Text style={style.nutritionFactsTitle}>Nutrition Facts</Text>
    <FlatList
      data={[
        // { name: 'Category', amount: 'Amount', percent: 'Daily ' },
        { name: 'Category', amount: 'Amount' },
        ...props.nutritions,
      ]}
      renderItem={renderItem}
      keyExtractor={({ name }) => name}
    />
  </View>
);

export default NutritionFacts;

const style = StyleSheet.create({
  nutritionFacts: {
    margin: 10,
  },
  nutritionFactsTitle: {
    fontSize: 22,
    marginBottom: 5,
  },
  nutritionFactsItem: {
    flexDirection: 'row',
    height: 30,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'black',
    paddingTop: 5,
  },
  nutritionFactsUnbold: {
    fontWeight: '400',
  },
});
