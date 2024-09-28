// src/helpers/deliveryCharges.js

const deliveryCharges = {
    'Province 1': 100,
    'Province 2': 150,
    'Province 3': 100,
    'Province 4': 125,
    'Province 5': 75,
    'Province 6': 150,
    'Province 7': 50
};

const provinceNames = {
    1: 'Province 1',
    2: 'Province 2',
    3: 'Province 3',
    4: 'Province 4',
    5: 'Province 5',
    6: 'Province 6',
    7: 'Province 7'
};

export const getDeliveryCharge = (provinceNumber) => {
    const provinceName = provinceNames[provinceNumber];
    return deliveryCharges[provinceName] || 0;
};
