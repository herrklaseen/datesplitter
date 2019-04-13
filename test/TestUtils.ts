export class TestUtils {
    public static getDateFormat() {
        return {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false 
        };
    };

    public static getLocale()  {
        return 'sv-SE';
    };
}

