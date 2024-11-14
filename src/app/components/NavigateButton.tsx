// components/NavigateButton.tsx (Client Component)
"use client"; // Marks this component as a client component
import { useRouter } from 'next/navigation';

const NavigateButton = ({ target }:{target :string}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(target);
  };

  return (
    <button onClick={handleNavigation} className="px-4 py-2 bg-blue-500 text-white rounded">
      Go to Target Page
    </button>
  );
};

export default NavigateButton;
