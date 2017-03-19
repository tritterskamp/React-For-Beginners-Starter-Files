import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getinitialstate
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    // update our state - make a copy first, this is best practice:
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  render() {
    return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh Seafood Market" />
            <ul className="list-of-fishes">
              {Object
                .keys(this.state.fishes) // creates an array
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />) // this loops over the array and returns each Fish key
              }
            </ul>
          </div>
          <Order fishes={this.state.fishes} order={this.state.order} />
          <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
        </div>
    )
  }
}

export default App;
