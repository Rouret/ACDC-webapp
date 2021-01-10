import http from "@/services/http"
export default {
    async getEthereumPrice() {
        return await http
            .get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur&include_24hr_change=true"
            ).then(res => {
                return res.ethereum.eur
            })
    },
}