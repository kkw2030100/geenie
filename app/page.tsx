import Header from '@/components/layout/Header';
import DashboardGrid from '@/components/layout/DashboardGrid';
import ClockWidget from '@/components/widgets/ClockWidget';
import WeatherCard from '@/components/widgets/WeatherCard';
import AgentStatus from '@/components/widgets/AgentStatus';
import CronMonitor from '@/components/widgets/CronMonitor';
import RichgoStats from '@/components/widgets/RichgoStats';
import HojaeWidget from '@/components/widgets/HojaeWidget';
import CalendarWidget from '@/components/widgets/CalendarWidget';
import StockWidget from '@/components/widgets/StockWidget';

export default function Home() {
  return (
    <main className="max-w-[1600px] mx-auto">
      <Header />
      <DashboardGrid>
        <ClockWidget />
        <WeatherCard />
        <AgentStatus />
        <StockWidget />
        <RichgoStats />
        <CronMonitor />
        <HojaeWidget />
        <CalendarWidget />
      </DashboardGrid>
    </main>
  );
}
