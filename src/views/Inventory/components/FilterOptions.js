/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Flex, Select } from '@chakra-ui/react';

function FilterOptions({ dataFilter }) {
  const [filterInventory, setFilterInventory] = useState('');

  const changeFilter = (e) => {
    setFilterInventory(e.target.value);
    dataFilter(e.target.value);
  };

  return (
    <Flex
      style={{
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
      }}>
      <Flex>
        <Select
          variant="filled"
          size="sm"
          placeholder={'All'}
          value={filterInventory}
          onChange={changeFilter}>
          <option value="Food">Food</option>
          <option value="Energy Drink">Energy Drink</option>
          <option value="Sports Drinks">Sports Drinks</option>
          <option value="Drinks">Drinks</option>
          <option value="Soda">Soda</option>
          <option value="Frozen Food">Frozen Food</option>
          <option value="Dairy">Dairy</option>
          <option value="Nuts/Seeds">Nuts/Seeds</option>
          <option value="Chips">Chips</option>
          <option value="Candies/Bars/Gum">Candies/Bars/Gum</option>
          <option value="Ice Creams">Ice Creams</option>
          <option value="Teas/coffees">Teas/coffees</option>
          <option value="Water/Juices">Water/Juices</option>
          <option value="Health and Wellness">Health and Wellness</option>
          <option value="Household Essentials">Household Essentials</option>
          <option value="Dry Tea/Coffee">Dry Tea/Coffee</option>
          <option value="Cheese">Cheese</option>
        </Select>
      </Flex>
    </Flex>
  );
}

export default FilterOptions;
