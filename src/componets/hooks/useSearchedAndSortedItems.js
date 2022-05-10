import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts
}

export const useSearchedAndSortedItems = (posts, sort, query, searchField) => {
    const sortedPosts = useSortedPosts(posts, sort);

    const searchedAndSortedPosts = useMemo(() => {
        return sortedPosts.filter(p => p[searchField].toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return searchedAndSortedPosts;
}