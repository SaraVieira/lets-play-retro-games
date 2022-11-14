export const formatDate = (date: any) => new Date(date * 1000).toLocaleString(
    'PT-pt',
    {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
)