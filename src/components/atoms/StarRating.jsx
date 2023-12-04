import React from 'react';
import { View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

const StarRating = ({ score, size = 30, halfStars = false, color="gold" }) => {
  const renderStars = () => {
    const filledStars = Math.floor(score);
    const hasHalfStar = halfStars && score % 1 !== 0;
    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const starArray = [];

    for (let i = 0; i < filledStars; i++) {
      starArray.push(<Icon key={i} name="star" size={size} color={color} />);
    }

    if (hasHalfStar) {
      starArray.push(<Icon key="half" name="star-half-full" size={size} color={color} />);
    }

    for (let i = 0; i < remainingStars; i++) {
      starArray.push(<Icon key={filledStars + i} name="star-o" size={size} color={color} />);
    }

    return starArray;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};

export default StarRating;
