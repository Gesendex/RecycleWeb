import {useMemo} from "react";

export const useSortedItems = (items, sort) => {
    const sortedItems = useMemo(() => {
        if (sort) {
            return [...items].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return items
    }, [sort, items])

    return sortedItems
}

export const useSearchedAndSortedItems = (posts, sort, query, searchField) => {
    const sortedItems = useSortedItems(posts, sort);

    const searchedAndSortedPosts = useMemo(() => {
        return sortedItems.filter(p => p[searchField].toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedItems])

    return searchedAndSortedPosts;
}

export const useSortByGarbageType = (posts, sort, query, searchField, garbageType) => {
    const searchedAndSortedItems = useSearchedAndSortedItems(posts, sort, query, searchField);

    const sortedByGarbageType = useMemo(() => {
        if (garbageType === 0) {
            return searchedAndSortedItems;
        }
        return searchedAndSortedItems.filter(point => point.garbageTypes.some(type => type.idTypeOfGarbage == garbageType))

    }, [searchedAndSortedItems, garbageType])

    return sortedByGarbageType;
}