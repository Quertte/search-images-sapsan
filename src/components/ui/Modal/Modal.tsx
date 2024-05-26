import { FC } from 'react'
import classes from './Modal.module.css'
import closeModalIcon from '../../../../public/close_modal.svg'

interface ModalProps {
    show: boolean,
    url: string
    onClose: () => void
}

export const Modal: FC<ModalProps> = ({ show, url, onClose }) => {
    if (!show) {
        return null
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <img src={url} alt="pic" />
                {/* <button onClick={onClose} /> */}
            </div>
            <button className={classes.buttonClose} onClick={onClose}><img src={closeModalIcon} alt="close-icon" /></button>
        </div>
    )
}