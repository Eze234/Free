export function date(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Asuncion',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}