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

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
            resolve(fileReader.result)
        };

        fileReader.onerror = (error) => {
            reject(error)
        };
    })
}

export function getBinary(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onloadend = () => {
            resolve(fileReader.result)
        };

        fileReader.onerror = (error) => {
            reject(error)
        };
    })
}


