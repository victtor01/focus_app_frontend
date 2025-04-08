import { CenterSection } from "@/components/center-section";
import { IntensiveDashboard } from "@/components/intensive-dashboard";
import AllTasksList from "../tasks/page";
import { AllTasks } from "./year-tasks";
import Reminders from "./reminders";

export default function Home() {
  return (
    <CenterSection className="flex-col px-2 py-4">
      <div className="pointer-events-none fixed inset-0 h-full w-full bg-transparent z-0 opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="pointer-events-none fixed bottom-0 left-0 opacity-30 z-0 bg-indigo-500 w-[20vh] h-[20vh] rounded-[30%] rotate-[14deg] translate-x-[-50%] translate-y-[20%]"></div>
      <div className="pointer-events-none fixed bottom-40 opacity-10 right-0 z-0 bg-indigo-500 w-[20vh] h-[20vh] rounded-[30%] rotate-[14deg] translate-x-[50%] translate-y-[20%]"></div>
      <IntensiveDashboard />
      <AllTasksList />
      <Reminders />
      <AllTasks />
    </CenterSection>
  );
}
