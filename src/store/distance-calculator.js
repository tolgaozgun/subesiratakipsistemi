export const distanceCalculator = (branch, center, locationType, userLocation) => {
    let branchDist;
    if (locationType === "device") {
        branchDist = Math.ceil(computeDistance([userLocation.lat, userLocation.lng], [branch.coordinateX, branch.coordinateY]))
    } else if (center) {
        branchDist = Math.ceil(computeDistance([center.lat, center.lng], [branch.coordinateX, branch.coordinateY]))
    }
    return branchDist;
}


function computeDistance([prevLat, prevLong], [lat, long]) {

    const prevLatInRad = toRad(prevLat);
    const prevLongInRad = toRad(prevLong);
    const latInRad = toRad(lat);
    const longInRad = toRad(long);

    return (
        // In meters
        6377830.272 *
        Math.acos(
            Math.sin(prevLatInRad) * Math.sin(latInRad) +
            Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
        )
    );
}


function toRad(angle) {
    return (angle * Math.PI) / 180;
}