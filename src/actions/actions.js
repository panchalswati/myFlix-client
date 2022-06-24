export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export const SET_AUTH = "SET_AUTH";
export const SET_USERS = "SET_USERS"

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function setAuth(token, users) {
    return { type: SET_AUTH, value: { token, users } };
}

export function setUsers(userObject) {
    return { type: SET_USERS, value: usersObject }
}