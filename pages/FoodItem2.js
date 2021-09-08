import React, { useEffect, useState } from 'react';
import { Text, View, Image, Table } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

const Container = styled.View`
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: flex-end;
  // border: 1px solid;
  padding: 20px;
  height: 40vh;
`;

const Container2 = styled.View`
  margin: 0 25vw;
  width: 80vw;
  justifyContent: flex-start;
  alignItems: flex-start;
  // border: 1px solid;
  padding: 20px;
  height: 40vh;
`;

const MacroText = styled.Text`
  font-weight: 800;
  font-size: 10vw;
  color: white;
`;

const FoodName = styled.Text`
  font-size: 20vw;
  color: white;
`;

export default function FoodItem2 (props) {
  const [item, setItem] = useState('');
  const [error, setError] = useState('');

  async function fetchItem () {
    await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${props.location.state.item}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'exWckRIGUycsKl1m86V1Hg==rb7GmkWBSUYUgxP7'
      }})
    .then(response => response.json())
    .then(result => {
      setItem(result.items[0])
    });
  } 

  useEffect(() => {
    fetchItem();

  }, [])

  return (
    <LinearGradient colors={['#F2994A', '#F2C94C']} style={{ flex: 1 }}>
      <Container>
      { !item ? 'loading...' : '' }
      { error != '' ? <Text>{error.message}</Text> : '' }
      { item != '' ? <FoodName>{item.name}</FoodName> : '' }
      </Container>
      <Container2>
        <MacroText>Carbs: {item.carbohydrates_total_g}</MacroText>
        <MacroText>Proteins: {item.protein_g}</MacroText>
        <MacroText>Fats: {item.fat_total_g}</MacroText>
      </Container2>
    </LinearGradient>
  )
}
