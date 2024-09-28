// provinceDistricts.js

const provinceDistricts = {
    1: [
        'Bhojpur',
        'Chhatharapati',
        'Dhankuta',
        'Ilam',
        'Jhapa',
        'Khotang',
        'Morang',
        'Okhaldhunga',
        'Panchthar',
        'Sankhuwasabha',
        'Solukhumbu',
        'Sunsari',
        'Taplejung',
        'Terhathum',
        'Udayapur'
    ],
    2: [
        'Bara',
        'Dhanusha',
        'Mahottari',
        'Parsa',
        'Rautahat',
        'Saptari',
        'Sarlahi',
        'Siraha'
    ],
    3: [
        'Bhaktapur',
        'Chitwan',
        'Dolakha',
        'Dolpa',
        'Kathmandu',
        'Kavrepalanchok',
        'Makwanpur',
        'Nuwakot',
        'Ramechhap',
        'Rasuwa',
        'Sindhuli',
        'Sindhupalchok'
    ],
    4: [
        'Baglung',
        'Gorkha',
        'Kaski',
        'Lamjung',
        'Manang',
        'Musta',
        'Nawalpur',
        'Parbat',
        'Syangja',
        'Tanahun'
    ],
    5: [
        'Banke',
        'Bardiya',
        'Dang',
        'Gulmi',
        'Kapilvastu',
        'Nawalparasi',
        'Rupandehi',
        'Salyan',
        'Rolpa',
        'Pyuthan'
    ],
    6: [
        'Dailekh',
        'Dolpa',
        'Humla',
        'Jajarkot',
        'Jumla',
        'Kalaiya',
        'Mugu',
        'Rukum',
        'Salyan',
        'Surkhet'
    ],
    7: [
        'Achham',
        'Baitadi',
        'Bajhang',
        'Bajura',
        'Darchula',
        'Dadeldhura',
        'Doti',
        'Kailali',
        'Kanchanpur'
    ]
};

const getDistrictsByProvince = (provinceNo) => {
    return provinceDistricts[provinceNo] || [];
};

module.exports = {
    getDistrictsByProvince
};
