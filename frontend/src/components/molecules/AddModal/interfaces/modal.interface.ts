export interface ModalInterface{
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}