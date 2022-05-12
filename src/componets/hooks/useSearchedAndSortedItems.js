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

export const useSortByGarbageTypeIdAndCompanyId = (posts, sort, query, searchField, garbageTypeId, companyId) => {
    const sortedItems = useSearchedAndSortedItems(posts, sort, query, searchField);

    const sortedByGarbageType = useMemo(() => {
        let res = sortedItems;
        if (companyId != 0) {
            res = res.filter(point => point.company.id == companyId);
        }
        if (garbageTypeId != 0) {
            console.log(garbageTypeId)
            console.log(res)
            res = res.filter(point => point.garbageTypes.some(type => type.idTypeOfGarbage == garbageTypeId));
            console.log(res)
        }
        return res;
    }, [sortedItems, garbageTypeId, companyId])

    return sortedByGarbageType;
}