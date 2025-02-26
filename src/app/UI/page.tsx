import IconTest from "./IconTest";
import ButtonTest from "./ButtonTest";
import CardTest from "./CardWithForm";
import CardWithNotification from "./CardWithNotification";
import TableDemo from "./TableDemo";
import ChartTest from "./ChartTest";


export default function UIPage() {
    return (
        <div>
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
        </div>
    )
}