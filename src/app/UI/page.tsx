import IconTest from "./IconTest";
import ButtonTest from "./ButtonTest";
import CardTest from "./CardWithForm";
import CardWithNotification from "./CardWithNotification";

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
        </div>
    )
}