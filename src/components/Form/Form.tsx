/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, SetStateAction, memo } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import classes from './Form.module.css'

interface FormProps {
    query: string,
    setQuery: React.Dispatch<SetStateAction<string>>
    handleSearch: () => void
    data: any[],
    isNotFound: boolean,
}

export const Form: FC<FormProps> = memo(({ query, setQuery, handleSearch, data, isNotFound }) => {

    const justifyContentClass = data.length ? classes.formStart : '';

    const justifyContentClassIfisNotFound = isNotFound ? classes.formStart : ''

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