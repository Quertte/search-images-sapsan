/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, SetStateAction, memo, useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import classes from './Form.module.css'

interface FormProps {
    query: string,
    setQuery: React.Dispatch<SetStateAction<string>>
    // handleSearch: () => void
    data: any[],
    isNotFound: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
    setData: React.Dispatch<SetStateAction<any[]>>
    fetchPictures: (query: string, i: number) => void
}

export const Form: FC<FormProps> = memo(({ query, setQuery,  /* handleSearch, */ data, isNotFound, setData, setIsLoading, fetchPictures }) => {

    const justifyContentClass = data.length ? classes.formStart : '';

    const justifyContentClassIfisNotFound = isNotFound ? classes.formStart : ''

    const [imagePerPage, setImagePerPage] = useState(0);





    const calculateImagesPerPage = () => {
        const mobileBreakpoint = 768;
        const imagePerRow = window.innerWidth <= mobileBreakpoint ? 3 : 6;
        const imageHeight = window.innerWidth <= mobileBreakpoint ? 114 : 204;
        const rowsPerPage = Math.floor(window.innerHeight / imageHeight);
        setImagePerPage(imagePerRow * rowsPerPage);
    };

    useEffect(() => {
        calculateImagesPerPage();

        window.addEventListener('resize', calculateImagesPerPage);

        return () => {
            window.removeEventListener('resize', calculateImagesPerPage);
        }
    }, []);

    const handleSearch = useCallback(async () => {
        setData([])
        if (query) {
            setIsLoading(true);
            const pagesToLoad = Math.ceil(imagePerPage / 10);

            for (let i = 1; i <= pagesToLoad; i++) {
                await fetchPictures(query, i);
            }
        }


        setIsLoading(false);
    }, [imagePerPage, query, setData, setIsLoading, fetchPictures])

    return (
        <>
            <div className={`${classes.form} ${justifyContentClass} ${justifyContentClassIfisNotFound}`}>
                <Input
                    type="text"
                    value={query}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                    placeholder='Телефоны, яблоки, груши...'
                    setQuery={setQuery}
                />
                <Button
                    type="button"
                    onClick={handleSearch}
                >
                    Искать
                </Button >

            </div>
        </>
    )
})