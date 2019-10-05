import React from 'react';
import axios from 'axios';

class Item extends React.Component {
  state = {
    itemData: {
      itemName: '',
      itemPrice: '',
      itemCurrency: ''
    }
  }

  componentDidMount = () => {
    /**
     * Get data from backend and add it to state
     */
    axios.get('/api/item')
      .then((res) => {
        const itemData = { ...res.data };
        this.setState({
          itemData
        })
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render(){
    const { itemName, itemPrice, itemCurrency } = this.state.itemData;
    return (
      <div>
        <h1>Koa <span aria-label="red heart" role="img">❤️</span> React</h1>
        <p>Data from backend: {itemName} {itemPrice} {itemCurrency}</p>
      </div>
    );
  }
}

export default Item;