import React from 'react';

interface Props { rating: number; }

const RatingStars: React.FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ color: '#FFD700', display: 'flex', alignItems: 'center' }}>
      {Array(fullStars).fill('★')}
      {halfStar && '☆'}
      {Array(emptyStars).fill('☆')}
      <span style={{ color: 'var(--text-color)', marginLeft: '5px' }}>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;