import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(e) {
    e.preventDefault();
    console.log('You changed the URL');
    // first, grab the value from the input box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second, transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
          <button type="submit">Visit Store</button>
        </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
