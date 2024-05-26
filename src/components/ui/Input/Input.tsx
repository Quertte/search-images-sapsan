import { FC, InputHTMLAttributes, SetStateAction, useState } from 'react'
import classes from './Input.module.css'
import seacrIcon from '../../../../public/search_icon.svg'
import closeIcon from '../../../../public/close.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    setQuery: React.Dispatch<SetStateAction<string>>

}



export const Input: FC<InputProps> = ({ setQuery, ...props }) => {
    const [active, setActive] = useState(false)

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        setQuery('')
    }
    return (
        <div className={classes.input_container}>
            <img className={classes.search} src={seacrIcon} alt="searchIcon" />
            <input className={classes.input} {...props} onFocus={() => setActive(true)} onBlur={() => setActive(false)} />
            {active && <img className={classes.close} src={closeIcon} alt="closeIcon" onMouseDown={handleMouseDown} />}
        </div>

    )
}