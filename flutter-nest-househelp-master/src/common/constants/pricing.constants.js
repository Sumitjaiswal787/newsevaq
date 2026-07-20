"use strict";
/**
 * Pricing constants for Sevaq subscription services
 * All prices are in INR per month
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_MEAL_PLANS = exports.COOKING_MEAL_PRICES = exports.COOKING_FULL_DAY_PRICES = exports.CLEANING_PRICES = void 0;
exports.CLEANING_PRICES = {
    1: 1999,
    2: 2999,
    3: 3999,
};
exports.COOKING_FULL_DAY_PRICES = {
    1: 4499,
    2: 6999,
    3: 9299,
    4: 11499,
    5: 13499,
    6: 15299,
};
exports.COOKING_MEAL_PRICES = {
    1: {
        BF: 1299,
        LUNCH: 1599,
        DINNER: 1599,
        BF_LUNCH: 2599,
        LUNCH_DINNER: 2899,
    },
    2: {
        BF: 1999,
        LUNCH: 2499,
        DINNER: 2499,
        BF_LUNCH: 3999,
        LUNCH_DINNER: 4499,
    },
    3: {
        BF: 2599,
        LUNCH: 3299,
        DINNER: 3299,
        BF_LUNCH: 5299,
        LUNCH_DINNER: 5999,
    },
    4: {
        BF: 3199,
        LUNCH: 3999,
        DINNER: 3999,
        BF_LUNCH: 6499,
        LUNCH_DINNER: 7299,
    },
    5: {
        BF: 3699,
        LUNCH: 4699,
        DINNER: 4699,
        BF_LUNCH: 7499,
        LUNCH_DINNER: 8499,
    },
    6: {
        BF: 4199,
        LUNCH: 5299,
        DINNER: 5299,
        BF_LUNCH: 8499,
        LUNCH_DINNER: 9599,
    },
};
exports.VALID_MEAL_PLANS = [
    'BF',
    'LUNCH',
    'DINNER',
    'BF_LUNCH',
    'LUNCH_DINNER',
    'FULL_DAY',
];
