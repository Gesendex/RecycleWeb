export function GetFullAddress(point) {
    if (!point) {
        return ''
    }

    return [point.street, point.building].join(', ')
}

export function GetTitle(point) {
    if (!point) {
        return ''
    }

    return `Компания: ${point.company.name}, адрес: ${GetFullAddress(point)}`
}


