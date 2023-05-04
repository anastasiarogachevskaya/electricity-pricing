import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import PriceText from './components/PriceText';
import { getElectricityPrice } from './api';

const START_DEFAULT = { x: 0.5, y: 0 };
const END_DEFAULT = { x: 0.5, y: 1 };
const START_HORIZONTAL = { x: 0, y: 0.5 };
const END_HORIZONTAL = { x: 1, y: 0.5 };
const GRADIENT_COLORS = ["#fdf4c9", "#fbcdf2", "#e8befa", "#acbfff", "#bbf3bf", "#fdf4c9", "#fbcdf2"];
const GRADIENT_LOCATIONS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout = undefined;

export default function App() {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const fetchPrice = async () => {
      const currentDate = new Date();
      const date = currentDate.toISOString().split('T')[0];
      const hour = currentDate.getHours();
    
      const data = await getElectricityPrice(date, hour);
      setPrice(data?.price);
    };
    fetchPrice();
  }, []);
  let [gradientOptions, setGradientOptions] = React.useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: START_DEFAULT,
    end: END_DEFAULT
  });
  const gradientOptionsRef = React.useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  useEffect(() => {
    infiniteRainbow();
  }, []);

  let infiniteRainbow = () => {
    if (gradientOptionsRef.current.locations[1] - MOVEMENT <= 0) {
      // Shift colours and reset locations
      let gradientColors = [...gradientOptionsRef.current.colors];
      gradientColors.shift();
      gradientColors.push(gradientColors[1]);

      setGradientOptions({
        colors: gradientColors,
        locations: GRADIENT_LOCATIONS,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    } else {
      let updatedLocations = gradientOptionsRef.current.locations.map((item, index) => {
        if (index === gradientOptionsRef.current.locations.length - 1) {
          return 1;
        }

        return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
      });

      setGradientOptions({
        colors: [...gradientOptionsRef.current.colors],
        locations: updatedLocations,
        start: START_DEFAULT,
        end: END_DEFAULT
      });
    }

    timeout = setTimeout(infiniteRainbow, INTERVAL);
  };

  let slideClosed = (start, end) => {
    let updatedLocations = gradientOptionsRef.current.locations.map(item => {
      return parseFloat(Math.min(1, item + MOVEMENT).toFixed(2));
    });

    setGradientOptions({
      colors: [...gradientOptionsRef.current.colors],
      locations: updatedLocations,
      start: start,
      end: end
    });

    if (!updatedLocations.every(item => item === 1)) {
      timeout = setTimeout(() => slideClosed(start, end), INTERVAL);
    }
  };

  return (
    <LinearGradient 
      style={styles.container}
      colors={gradientOptions.colors}
      locations={gradientOptions.locations}
      start={gradientOptions.start}
      end={gradientOptions.end}
    >
      <PriceText>Hello {price}</PriceText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});