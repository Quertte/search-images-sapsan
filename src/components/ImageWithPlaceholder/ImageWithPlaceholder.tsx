import { FC } from 'react';
import classes from './ImageWithPlaceholder.module.css'

interface ImageWithPlaceholder {
    src: string,
    onClick: () => void
}

export const ImageWithPlaceholder: FC<ImageWithPlaceholder> = ({ src, onClick }) => (
    <div className={classes.container}>
        {<img src={src} alt="фото" className={classes.img} onClick={onClick} />}
    </div>
);