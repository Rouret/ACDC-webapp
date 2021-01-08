const METHOD = { GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE" };

export default {
    async delete(url) {
        return await this.call(METHOD.DELETE, url);
    },
    async get(url) {
        return await this.call(METHOD.GET, url);
    },
    async post(url, body) {
        return await this.call(METHOD.POST, url, body);
    },
    async put(url, body) {
        return await this.call(METHOD.PUT, url, body);
    },
    async call(method, url, body, isStr) {
        try {
            const init = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: method,
                body: JSON.stringify(body)
            };
            const res = await fetch(url, init);
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.erreurs);
            }
            return res.json();
        } catch (err) {
            console.log(err)
        }
    },
};