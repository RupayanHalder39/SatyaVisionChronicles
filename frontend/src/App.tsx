import { useState } from 'react';
import { ModeToggle } from '@/components/navbar/ModeToggle';
import { JourneyMode } from '@/pages/JourneyMode';
import { DashboardMode } from '@/pages/DashboardMode';

export type ViewMode = 'journey' | 'dashboard';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('journey');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f3e8ff] to-[#fef3c7]">
      <ModeToggle mode={viewMode} onChange={setViewMode} />
      {viewMode === 'journey' ? <JourneyMode /> : <DashboardMode />}
    </div>
  );
}
