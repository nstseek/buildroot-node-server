export const makeUri = ({
    username,
    password,
    host,
}: {
    username: string;
    password: string;
    host: string;
}): string =>
    `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`;
