export function fetch(input) {
    let { countryCode, longitude, latitude } = input.deliveryAddress;
    if (longitude && latitude && countryCode === 'CA') {
        return {
            request: buildExternalApiRequest(latitude, longitude),
        };
    }
    return { request: null };
}

function buildExternalApiRequest(latitude, longitude) {
    // The latitude and longitude parameters are included in the URL for demonstration purposes only. They do not influence the result.
    let url = `https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api-v2.json?v=1714588690&lat=${latitude}&lon=${longitude}`

    return {
        method: 'GET',
        url,
        headers: [{
            name: "Accept",
            value: "application/json; charset=utf-8"
        }],
        body: null,
        policy: {
            readTimeoutMs: 500,
        },
    };
}
