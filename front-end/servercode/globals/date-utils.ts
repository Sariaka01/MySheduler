export function getOperationTime(): string {
    const now= new Date()
    return `${now.toDateString()} ${now.toTimeString().split(' ')[0]}`
}