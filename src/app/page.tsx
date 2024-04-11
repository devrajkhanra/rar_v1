'use client'
import React from 'react';
import Header from '@/components/Header';
import useSidebarStore from '@/store/sidebarItems'; // Assuming this contains the store hook
import BroadDash from '@/components/Broad/BroadDash';
import Midcap50 from '@/components/Midcap50/Midcap50';
import Next50 from '@/components/Next50/Next50';
import Nifty50 from '@/components/Nifty50/Nifty50';
import { ScrollArea } from '@radix-ui/react-scroll-area';

// Define components corresponding to each item
const ComponentMap: Record<string, React.FC> = {
  // Define your components here
  BroadDashboard: () => <BroadDash />,
  "Nifty 50": () => <Nifty50 />,
  'Next 50': () => <Next50 />,
  'Midcap 50': () => <Midcap50 />,

};

const Home: React.FC = () => {
  const { selectedItems } = useSidebarStore();

  // Get the first selected item (assuming only one item can be selected at a time)
  const selectedItem = selectedItems[0];

  // Render the selected component or null if no item is selected
  const SelectedComponent = selectedItem ? ComponentMap[selectedItem] : null;

  return (
    <main className="flex min-h-screen flex-col">
      <ScrollArea>
        {SelectedComponent && <SelectedComponent />}
      </ScrollArea>
    </main>
  );
};

export default Home;
