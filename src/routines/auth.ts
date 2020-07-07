const auth = () => {
    const conditionals: boolean[] = [
        localStorage.getItem("token") !== undefined,
        localStorage.getItem("token") !== "",
        localStorage.getItem("token") !== null
    ]

    return conditionals.includes(false);
}

export default auth;