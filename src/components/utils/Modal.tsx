import {
    Component, createEffect,
    createSignal, JSX,
    ParentComponent, Setter,
    Show,
} from "solid-js";
import {Portal} from "solid-js/web";
import Button from "./Button";

type ModalProps = {
    setOpen: Setter<boolean>;
}

type Props = {
    openComponent: Component<ModalProps>;
    children: Component<ModalProps>;
}

const Modal: Component<Props> = (props) => {

    const [isOpen, setOpen] = createSignal(false);
    let modalRef: HTMLDivElement;

    const enableScroll = () => {
        document.body.classList.remove("no-scroll");
    }

    const disableScroll = () => {
        document.body.classList.add("no-scroll");
    }

    createEffect(() => isOpen() ? disableScroll() : enableScroll())

    return (
        <>
            <props.openComponent setOpen={setOpen}/>
            <Show when={isOpen()}>
                <Portal>
                    <div
                        onClick={(e) => {
                            if (!modalRef.contains(e.target)) {
                                setOpen(false);
                            }
                        }}
                        class="openModal"
                    >
                        <div ref={modalRef!}
                             class="modal fixed min-w-160 top-14 left-2/4 p-8 -translate-x-1/2 rounded-2xl">
                            {props.children({setOpen})}
                        </div>
                    </div>
                </Portal>
            </Show>
        </>
    );
};

export default Modal;