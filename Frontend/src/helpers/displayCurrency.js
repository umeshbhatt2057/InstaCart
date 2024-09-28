const displayNPRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: 'NPR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // Format the number and replace NPR with Rs
    return formatter.format(num).replace('NPR', 'Rs.');
}

export default displayNPRCurrency;
