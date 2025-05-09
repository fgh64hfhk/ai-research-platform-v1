import IconTest from "./IconTest";
import ButtonTest from "./ButtonTest";
import CardTest from "./CardWithForm";
import CardWithNotification from "./CardWithNotification";
import TableDemo from "./TableDemo";
import ChartTest from "./ChartTest";
import ChartDemo from "./ChartDemo";
import ProfileForm from "./ProfileForm";
import DialogDemo from "./DialogDemo";
import SonnerDemo from "./SonnerDemo";
import SonnerToast from "./SonnerToast";

import { AddScheduleLogic } from "../models/schedule/AddScheduleLogic";
import { ScheduleProvider } from "../models/schedule/ScheduleContextProvider";

import { Toaster } from "sonner";

export default function UIPage() {
  return (
    <div>
      <Toaster richColors closeButton />
      <ScheduleProvider>
        <AddScheduleLogic />
      </ScheduleProvider>
      <hr />
      <IconTest />
      <hr />
      <ButtonTest />
      <hr />
      <CardTest />
      <hr />
      <CardWithNotification />
      <hr />
      <TableDemo />
      <hr />
      <ChartTest />
      <hr />
      <ChartDemo />
      <hr />
      <ProfileForm />
      <hr />
      <DialogDemo />
      <hr />
      <SonnerDemo />
      <hr />
      <SonnerToast />
    </div>
  );
}
