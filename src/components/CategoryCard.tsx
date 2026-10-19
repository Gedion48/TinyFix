import React from 'react';
import { BookOpen, Compass, Home, UtensilsCrossed, Zap } from 'lucide-react';
import { CategoryInfo } from '../types';

interface CategoryCardProps {
  category: CategoryInfo;
  isSelected: boolean;
  count: number;
  onSelect: (id: CategoryInfo['id']) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  count,
  onSelect,
}) => {
  // Render corresponding icon dynamically
  const renderIcon = () => {
    const props = { className: 'w-5 h-5 sm:w-6 sm:h-6' };
    switch (category.iconName) {
      case 'Zap':
        return <Zap {...props} />;
      case 'Home':
        return <Home {...props} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Zap {...props} />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:ring-offset-2 ${
        isSelected
          ? 'bg-white border-[#FF5C28] shadow-md shadow-[#FF5C28]/15 ring-2 ring-[#FF5C28]/20 -translate-y-0.5'
          : 'bg-white/80 hover:bg-white border-[#E8E2D8] hover:border-[#D1C7B7] shadow-xs hover:shadow-sm'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
            isSelected
              ? 'bg-[#FF5C28] text-white shadow-sm'
              : `${category.bgTint} ${category.textColor} border ${category.borderColor}`
          }`}
        >
          {renderIcon()}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
            isSelected
              ? 'bg-[#FF5C28]/10 text-[#FF5C28] border-[#FF5C28]/30'
              : 'bg-[#F4EFEA] text-[#64748B] border-[#E8E2D8]'
          }`}
        >
          {count} {count === 1 ? 'fix' : 'fixes'}
        </span>
      </div>

      <h3 className="font-bold text-sm sm:text-base text-[#0F1E36] group-hover:text-[#FF5C28] transition-colors mb-1">
        {category.label}
      </h3>
      <p className="text-xs text-[#556987] leading-relaxed line-clamp-2">
        {category.shortDesc}
      </p>

      {isSelected && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF5C28] rounded-full" />
      )}
    </button>
  );
};
