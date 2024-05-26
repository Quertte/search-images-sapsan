import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import classes from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className={classes.button}
            {...props}
        >
            {children}
        </button>
    )
}