/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { Form } from './components/Form';
import { Gallery } from './components/Gallery/Gallery';

function App() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false);
    const [, setPage] = useState(1);
    const [imagePerPage, setImagePerPage] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false)


    const classes = ['main_container'];

    if (data.length) {
        classes.push('main_container_start')
    }

    if (isNotFound) {
        classes.push('main_container_start')

    }
    // useEffect для прокрутки, чтобы загрузить больше изображений при достижении конца страницы
    useEffect(() => {
        const handleScroll = () => {
            // Загрузите больше данных только если данные уже были загружены и нет текущей загрузки
            if (data?.length && !isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    fetchPictures(query, nextPage); // Убедитесь, что у вас есть searchQuery в доступе
                    return nextPage;
                });
            }
        };

        // Установить обработчик события на прокрутку, если данные уже были загружены
        if (data?.length > 0) {
            window.addEventListener('scroll', handleScroll);
        }

        // Очистка обработчика
        return () => {
            if (data?.length > 0) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [data?.length, isLoading, query]); // Активировать этот useEffect при изменении данных или состояния загрузки

    useEffect(() => {
        calculateImagesPerPage();
        // Добавьте слушатель событий для обработки изменений размера окна
        window.addEventListener('resize', calculateImagesPerPage);

        return () => {
            // Удалите слушатель события при размонтировании компонента
            window.removeEventListener('resize', calculateImagesPerPage);
        }
    }, []);

    const calculateImagesPerPage = () => {
        const mobileBreakpoint = 768;
        const imagePerRow = window.innerWidth <= mobileBreakpoint ? 3 : 6;
        const imageHeight = window.innerWidth <= mobileBreakpoint ? 114 : 204;
        const rowsPerPage = Math.floor(window.innerHeight / imageHeight);
        setImagePerPage(imagePerRow * rowsPerPage);
    };

    const fetchPictures = async (query: string, i: number) => {
        setIsLoading(true);
        try {

            const response = await fetch(`https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${query}&page=${i}`);
            const newData = await response.json();
            console.log(newData, 'newData')
            if (newData.total > 0) {
                console.log('1')
                setIsNotFound(false)
                const photos = newData.results.map((el: any) => el.urls);

                setData((currentData) => [...currentData, ...photos]);

                setTotalImages(newData.total);

            } else {
                console.log('2')
                setIsNotFound(true)
            }



        } catch (error) {
            console.error("Error fetching pictures:", error);
            setIsNotFound(true)

        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = useCallback(async () => {
        setData([])
        if (query) {
            setIsLoading(true);
            // Вы можете настроить это значение в зависимости от того, сколько картинок вы хотите получать за один запрос
            const pagesToLoad = Math.ceil(imagePerPage / 10);

            for (let i = 1; i <= pagesToLoad; i++) {
                await fetchPictures(query, i);
            }
        }


        setIsLoading(false);
    }, [imagePerPage, query])


    return (
        <div className={classes.join(' ')}>
            <Form handleSearch={handleSearch} query={query} setQuery={setQuery} data={data} isNotFound={isNotFound} />
            <Gallery data={data} isLoading={isLoading} totalImages={totalImages} isNotFound={isNotFound} />
        </div>
    )
}

export default App
