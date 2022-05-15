import {useMemo} from "react";

export const useSortedItems = (items, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...items].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return items
    }, [sort, items])
}

export const useSearchedAndSortedItems = (items, sort, query, searchField) => {
    const sortedItems = useSortedItems(items, sort);

    return useMemo(() => {
        return sortedItems.filter(p => p[searchField].toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedItems]);
}

export const useSortByGarbageTypeIdAndCompanyId = (items, searchField, filter) => {
    const sortedItems = useSearchedAndSortedItems(items, filter.sort, filter.query, searchField);

    const sortedByCompany = useMemo(() => {
        if (filter.companyId != 0) {
            return sortedItems.filter(point => point.company.id == filter.companyId);
        }
        return sortedItems;
    }, [sortedItems, filter.companyId])

    const sortedByGarbageType = useMemo(() => {
        if (filter.garbageTypeId != 0) {
            return sortedByCompany.filter(point => point.garbageTypes.some(type => type.idTypeOfGarbage == filter.garbageTypeId));
        }
        return sortedByCompany;
    }, [sortedByCompany, filter.garbageTypeId])

    return useMemo(() => {
        return sortedByGarbageType.filter(p => [p.street, p.building].join(', ').toLowerCase().includes(filter.address.toLowerCase()))
    }, [sortedByGarbageType, filter.address]);
}