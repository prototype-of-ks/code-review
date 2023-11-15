export const safeParse = (json: string) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return {};
    }
};