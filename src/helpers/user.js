export const getFullname = (user) => {
    return [user.middlename, user.name].join(' ').trim()
}

export const getDate = (comment) => {
    if (!comment) {
        return ''
    }

    let formatDate = comment.dateOfCreation;
    formatDate = formatDate.split('T').join(' ').split('.')[0].replaceAll('-','/')
    formatDate = formatDate.split(' ')
    formatDate = [formatDate[0].split('/').reverse().join('/'), formatDate[1]].join(' ')

    console.log(formatDate)

    formatDate = formatDate.substring(0, formatDate.length - 3)

    console.log(formatDate)

    return formatDate
}