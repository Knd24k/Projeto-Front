import React from 'react';

interface Props { category: string; onClick: (cat: string) => void; }

const CategoryButton: React.FC<Props> = ({ category, onClick }) => (
  <button className="categoria-btn" onClick={() => onClick(category)}>
    {category}
  </button>
);

export default CategoryButton;