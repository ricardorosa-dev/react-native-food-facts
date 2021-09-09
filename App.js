import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

import Home from './pages/Home';
import FoodItem2 from './pages/FoodItem2';

export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route path="/foodItem" component={FoodItem2} />
    </NativeRouter>
  );
}
