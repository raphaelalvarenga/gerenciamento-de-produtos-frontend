export const pageHeaderToggle = (status: boolean) => {
    return {
        type: "pageHeaderToggle",
        payload: {
            status
        }
    }
}