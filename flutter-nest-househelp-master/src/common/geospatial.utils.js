"use strict";
/**
 * Shared geospatial calculation utilities
 * Single implementation for haversine distance calculation
 * Eliminates 5 duplicated implementations across codebase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRadians = toRadians;
exports.calculateDistance = calculateDistance;
exports.isWithinRadius = isWithinRadius;
var constants_1 = require("./constants");
/**
 * Convert degrees to radians
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
/**
 * Calculate great-circle distance between two geographic coordinates
 * using Haversine formula
 *
 * @returns Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return constants_1.EARTH_RADIUS_KM * c;
}
/**
 * Check if two coordinates are within specified radius
 */
function isWithinRadius(lat1, lon1, lat2, lon2, radiusKm) {
    return calculateDistance(lat1, lon1, lat2, lon2) <= radiusKm;
}
