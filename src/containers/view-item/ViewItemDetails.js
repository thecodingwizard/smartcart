import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { getItemDetails } from '../../actions/items.actions';

class ViewItemDetails extends Component {
  static navigationOptions = {
    title: "Product Details"
  };

  componentDidMount() {
    const upc = this.props.navigation.getParam('upc');
    this.props.dispatch(getItemDetails(upc));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam('upc') !==
      prevProps.navigation.getParam('upc')
    ) {
      this.props.dispatch(
        getItemDetails(this.props.navigation.getParam('upc'))
      );
    }

    if (this.props.notFound && !prevProps.notFound) {
      this.props.navigation.replace('AddItem', {
        upc: this.props.navigation.getParam('upc'),
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const upc = navigation.getParam('upc');
    return (
      <ScrollView style={style.container}>
        {this.props.itemDetails && (
          <React.Fragment>
            {this.props.itemDetails.nutritions && <NutritionFacts item={this.props.itemDetails} />}
            {this.props.itemDetails.ingredients && <IngredientsList item={this.props.itemDetails} />}
            <ProConList />
            <View style={{ height: 40 }} />
          </React.Fragment>
        )}
        {this.props.loading && <Text>Loading...</Text>}
        {this.props.error && <Text>Error: {this.props.error}</Text>}
      </ScrollView>
    );
  }
}

const ingredients =
  `Whole corn, sunflower and/or canola oil, whole wheat, brown rice flour, ` +
  `whole oat flour, sugar, tomato powder, salt, natural flavors, maltodextrin ` +
  `(made from corn), cheddar cheese (milk, cheese cultures, salt, enzymes), ` +
  `dextrose, buttermilk, onion powder, whey, yeast extract, romano cheese ` +
  `(part skim cow's milk, cheese cultures, salt, enzymes), whey protein ` +
  `concentrate, corn oil, spices (including jalapeno pepper), citric acid, ` +
  `paprika extracts, lactic acid.`;

const IngredientsList = (props) => (
  <View style={style.ingredientsList}>
    <Text style={style.ingredientsTitle}>Ingredients List</Text>
    <Text style={style.ingredientsContent}>{props.item.ingredients}</Text>
  </View>
);

const nutritions = [
  { name: 'Calories', amount: '100', percent: '5', indented: false },
  { name: 'Total Fat', amount: '0.5g', percent: '1', indented: false },
  { name: 'Saturated Fat', amount: '0g', percent: '0', indented: true },
  { name: 'Trans Fat', amount: '0g', percent: '0', indented: true },
  { name: 'Cholesterol', amount: '0mg', percent: '0', indented: false },
  { name: 'Sodium', amount: '380mg', percent: '16', indented: false },
  { name: 'Total Carbohydrate', amount: '22g', percent: '7', indented: false },
  { name: 'Dietary Fiber', amount: '6g', percent: '24', indented: true },
  { name: 'Sugars', amount: '1g', percent: '', indented: true },
  { name: 'Protein', amount: '6g', percent: '', indented: false },
];

const renderItem = ({ item }) => (
  <View style={style.nutritionFactsItem}>
    <Text
      style={{
        flex: 3,
        fontWeight: '900',
        ...(item.indented ? style.nutritionFactsUnbold : {}),
      }}
    >
      {(item.indented ? '        ' : '') + item.name}
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
        ...props.item.nutritions,
      ]}
      renderItem={renderItem}
      keyExtractor={({ name }) => name}
    />
  </View>
);

const proCons = {
  pros: ['Low in fat', 'Low in sodium', 'High in Iron'],
  cons: ['High in sugars', 'High in carbohydrates', 'Low in Calcium'],
};

const ProConList = () => (
  <View style={style.proConList}>
    <Text style={style.proConListTitle}>Pro / Cons</Text>
    <View style={style.proConListWrapper}>
      <FlatList
        data={proCons.pros}
        renderItem={({ item }) => (
          <View style={style.proConListItem}>
            <Text style={{ marginRight: 5 }}>&#9989;</Text>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={a => a}
      />
      <FlatList
        data={proCons.cons}
        renderItem={({ item }) => (
          <View style={style.proConListItem}>
            <Text style={{ marginRight: 5 }}>&#10060;</Text>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={a => a}
      />
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  muted: {
    fontSize: 25,
    color: '#3E4C59',
    fontWeight: '300',
  },
  ingredientsTitle: {
    fontSize: 22,
    marginBottom: 5,
  },
  ingredientsList: {
    margin: 10,
  },
  ingredientsContent: {
    fontSize: 15,
    lineHeight: 20,
  },
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
  proConList: {
    margin: 10,
  },
  proConListTitle: {
    fontSize: 22,
    marginBottom: 10,
  },
  proConListWrapper: {
    flexDirection: 'row',
  },
  proConListItem: {
    flexDirection: 'row',
    margin: 5,
  },
});

const mapStateToProps = state => {
  return {
    itemDetails: state.items.itemDetails,
    loading: state.items.loading,
    error: state.items.error,
    notFound: state.items.notFound,
  };
};

export default connect(mapStateToProps)(ViewItemDetails);
