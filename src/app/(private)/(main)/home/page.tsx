import { CenterSection } from "@/components/center-section";
import { IntensiveDashboard } from "@/components/intensive-dashboard";
import AllTasksList from "../tasks/page";
import { AllTasks } from "./year-tasks";
import Reminders from "./reminders";
import { CurrentTasks } from "@/components/current-tasks";

export default function Home() {
  return (
    <CenterSection className="flex-col px-4 py-4">
      <div className="pointer-events-none fixed inset-0 h-full w-full bg-transparent z-[-1] opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <IntensiveDashboard />
      <AllTasksList />
      <Reminders />
      <AllTasks />
      <CurrentTasks />
    </CenterSection>
  );
}
