/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'
import { ImageWithPlaceholder } from '../ImageWithPlaceholder'
import { Placeholder } from '../PlaceHolder/PlaceHolder'
import classes from './Gallery.module.css'
import { Modal } from '../ui/Modal'

interface GalleryProps {
    data: any[],
    totalImages: number,
    isLoading: boolean,
    isNotFound: boolean
}

export const Gallery: FC<GalleryProps> = memo(({ data, totalImages, isLoading, isNotFound }) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const handleImageClick = (url: string) => {
        console.log('Мухаха')
        setActiveImage(url)
    }


    return (
        <>
            {!isNotFound ?
                <div className={classes.gallery} onClick={e => handleImageClick((e.target as HTMLImageElement).currentSrc)}>
                    {data?.length > 0 && data.map((el, index) => (
                        <ImageWithPlaceholder key={index} src={el.small} />
                    ))
                    }


                    {
                        isLoading && Array.from({ length: totalImages - data.length }, (_, index) => <Placeholder key={index} />)
                    }


                </div>
                :
                <span className={classes.notFound}>К сожалению, поиск не дал результатов</span>
            }

            <Modal
                show={activeImage !== null}
                url={activeImage!}
                onClose={() => setActiveImage(null)}
            />

        </>
    )
})