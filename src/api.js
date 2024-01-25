export const baseUrl = "http://127.0.0.1:8080/notes/";

export const getAllNotes = (onResponse) =>
    fetch(`${baseUrl}all`)
        .then((res) =>
            res.json()
                .then(onResponse));

export const updateNote = (data) =>
    fetch(`${baseUrl}${data.id == null ? "create" : "update"}`, {
        method: data.id == null ? "POST" : "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(data),
    });
