export function fetch(input) {
    let deliveryAddress = getUniformDeliveryAddress(input.allocations);
    if (deliveryAddress) {
        let { countryCode, longitude, latitude } = deliveryAddress;
        if (longitude && latitude && countryCode === 'CA') {
            return {
                request: buildExternalApiRequest(latitude, longitude),
            };
        }
    }
    return { request: null };
}

function buildExternalApiRequest(latitude, longitude) {
    // The latitude and longitude parameters are included in the URL for demonstration purposes only. They do not influence the result.
    let url = `https://cdn.shopify.com/s/files/1/0628/3830/9033/files/pickup-points-external-api.json?v=1706549257&lat=${latitude}&lon=${longitude}`;

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

function getUniformDeliveryAddress(allocations) {
    if (allocations.length === 0) {
        return null;
    }

    let deliveryAddress = allocations[0].deliveryAddress;

    for (let i = 1; i < allocations.length; i++) {
        if (!isDeliveryAddressEqual(allocations[i].deliveryAddress, deliveryAddress)) {
            console.error("Allocations pointing to different delivery addresses are not supported.");
            return null;
        }
    }

    return deliveryAddress;
}

function isDeliveryAddressEqual(address1, address2) {
    return address1.countryCode === address2.countryCode &&
        address1.longitude === address2.longitude &&
        address1.latitude === address2.latitude;
}
