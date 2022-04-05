import React, {FC} from 'react';

interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {
    console.log(props.items)
    return (
        <>
            {props?.items?.map(props.renderItem)}
        </>
    )
}