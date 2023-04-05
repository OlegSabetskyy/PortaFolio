function fetch_example() {
    fetch("https://localhost/api", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a: 1, b: "Textual content" })
    })
        .then((res) => res.json())
        .then((res) => {
            // success
        })
        .catch((err) => {
            // err...
        });
}

async function fetch_example_await() {
    let response, content;

    response = await fetch("https://localhost/api", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            a: 1,
            b: "Textual content"
        })
    });

    try {
        content = await response.json();
        if (content.code != 200) throw new Error("error");
    } catch (err) {
        // err...
    }
}
