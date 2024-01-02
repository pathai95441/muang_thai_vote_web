export interface IModalProps {
    isOpen: boolean
    disagree: () => void
    agree: () => void
    message?: string
}