import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import { useFonts,
        Lora_500Regular
} from '@expo-google-fonts/dev'

const Container = styled.View`
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: flex-end;
  // border: 1px solid;
  padding: 20px;
  height: 60vh;
`;

const TitleText = styled.Text`
  color: white;
  font-family: Lora_500Regular;
  font-size: 20vw;
`;

const SearchInput = styled.TextInput`
  backgroundColor: white;
  border: 1px solid whitesmoke;
  border-radius: 25px;
  color: #F2994A
  font-size: 25px;
  margin: 25px 20px 0 20px;
  padding: 5px 15px;
  width: 85vw;
`;

const SuggestionView = styled.View`
  // border: 1px solid;
  border-radius: 5px;
  margin: 0 20px;
  width: 85vw;
  background-color: white;
`;

const SuggestionText = styled.Text`
  color: #F2994A;
  font-size: 20px;
  padding: 5px;
`;

export default function App() {
  const [suggestions, setStuggestions] = useState([]);

  async function searchFood (e) {
    setStuggestions([]);

    await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${e.target.value}`, {
      headers: {
        'x-app-id': 'eabafe64',
        'x-app-key': '27665c3ca9c38a298e73158862cb041a'
      }
    })
    .then(response => response.json())
    .then(results => {
      const foodSearch = [];
      results.common.map(result => {
        foodSearch.push(result.food_name)
      })
      setStuggestions(foodSearch);
    })
  }
  
  return (
    <LinearGradient colors={['#F2994A', '#F2C94C']} style={{ flex: 1 }}>
      <Container>
        <TitleText>
          Good <br/>Morning
        </TitleText>
      </Container>
      <SearchInput 
        onChange={(e) => searchFood(e)}
        autocomplete="off"
        placeholderTextColor="#C3C3C3"
      />
      <SuggestionView>
        { suggestions.length > 0 ? suggestions.map(
          suggestion => (
            <Link to={{
              pathname: "/foodItem",
              state: { item: suggestion }
            }}>
              <SuggestionText>{suggestion}</SuggestionText>
            </Link>
          )
        ): ('') }
      </SuggestionView>
    </LinearGradient>
  );
}
