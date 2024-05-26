/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { Form } from './components/Form';
import { Gallery } from './components/Gallery/Gallery';

function App() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false);
    const [, setPage] = useState(1);
    const [totalImages, setTotalImages] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false)


    const classes = ['main_container'];

    if (data.length) {
        classes.push('main_container_start')
    }

    if (isNotFound) {
        classes.push('main_container_start')

    }

    const fetchPictures = useCallback(async (query: string, i: number) => {
        setIsLoading(true);
        try {

            const response = await fetch(`https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${query}&page=${i}`);
            const newData = await response.json();
            if (newData.total > 0) {
                setIsNotFound(false)
                const photos = newData.results.map((el: any) => el.urls);
                setData((currentData) => [...currentData, ...photos]);
                setTotalImages(newData.total);
            } else {
                setIsNotFound(true)
            }
        } catch (error) {
            console.error("Error fetching pictures:", error);
            setIsNotFound(true)

        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (data?.length && !isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    fetchPictures(query, nextPage);
                    return nextPage;
                });
            }
        };

        if (data?.length > 0) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (data?.length > 0) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [data?.length, isLoading, query, fetchPictures]);


    return (
        <div className={classes.join(' ')}>
            <Form
                query={query}
                setQuery={setQuery}
                data={data}
                isNotFound={isNotFound}
                setIsLoading={setIsLoading}
                fetchPictures={fetchPictures}
                setData={setData}
            />
            <Gallery data={data} isLoading={isLoading} totalImages={totalImages} isNotFound={isNotFound} />
        </div>
    )
}

export default App
