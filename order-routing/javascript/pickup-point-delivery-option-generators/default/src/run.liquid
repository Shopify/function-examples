export function run(input) {
    const { fetchResult } = input;
    const status = fetchResult?.status;
    const body = fetchResult?.body;

    let operations = [];

    if (status === 200 && body) {
        const { deliveryPoints } = JSON.parse(body);
        operations = buildPickupPointDeliveryOptionOperations(deliveryPoints);
    }

    return { operations };

}

function buildPickupPointDeliveryOptionOperations(externalApiDeliveryPoints) {
    return externalApiDeliveryPoints
        .map(externalApiDeliveryPoint => ({ add: buildPickupPointDeliveryOption(externalApiDeliveryPoint) }));
}

function buildPickupPointDeliveryOption(externalApiDeliveryPoint) {
    return {
        cost: null,
        pickupPoint: {
            externalId: externalApiDeliveryPoint.pointId,
            name: externalApiDeliveryPoint.pointName,
            provider: buildProvider(),
            address: buildAddress(externalApiDeliveryPoint),
            businessHours: buildBusinessHours(externalApiDeliveryPoint),
        },
    };
}

function buildProvider() {
    return {
        name: "Shopify Javascript Demo",
        logoUrl: "https://cdn.shopify.com/s/files/1/0628/3830/9033/files/shopify_icon_146101.png?v=1706120545",
    };
}

function buildAddress(externalApiDeliveryPoint) {
    let location = externalApiDeliveryPoint.location;
    let addressComponents = location.addressComponents;
    let geometry = location.geometry.location;

    return {
        address1: `${addressComponents.streetNumber} ${addressComponents.route}`,
        address2: null,
        city: addressComponents.locality,
        country: addressComponents.country,
        countryCode: addressComponents.countryCode,
        latitude: geometry.lat,
        longitude: geometry.lng,
        phone: null,
        province: addressComponents.administrativeAreaLevel1,
        provinceCode: null,
        zip: addressComponents.postalCode,
    };
}

// Transforms the opening hours of a delivery point into a vector of `BusinessHours` objects.
// Each day's opening hours are represented using a `BusinessHours` object as follows:
// "Monday: 9:00 AM – 5:00 PM" is transformed to {day: "MONDAY", periods: [{opening_time: "09:00:00", closing_time: "17:00:00"}]}
// "Tuesday: Closed" is transformed to {day: "TUESDAY", periods: []}
function buildBusinessHours(externalApiDeliveryPoint) {
    return externalApiDeliveryPoint.openingHours.weekdayText
        .map(day => {
            let dayParts = day.split(": ");
            let dayName = dayParts[0].toUpperCase();
            if (dayParts[1] === "Closed") {
                return { day: dayName, periods: [] };
            } else {
                let openingClosingTimes = dayParts[1].split(" – ");
                return {
                    day: dayName,
                    periods: [{
                        openingTime: formatTime(openingClosingTimes[0]),
                        closingTime: formatTime(openingClosingTimes[1]),
                    }],
                };
            }
        });
}

// Converts a time string from 12-hour to 24-hour format.
// Example: "9:00 AM" => "09:00:00", "5:00 PM" => "17:00:00"
function formatTime(time) {
    let timeParts = time.split(' ');
    let hourMin = timeParts[0].split(':');
    let hour = parseInt(hourMin[0]);
    let min = hourMin[1];
    let period = timeParts[1];

    let hourIn24Format = period === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? hour : hour + 12);

    return `${hourIn24Format.toString().padStart(2, '0')}:${min}:00`;
}
