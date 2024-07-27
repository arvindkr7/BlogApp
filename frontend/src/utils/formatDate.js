const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Define options for the date formatting
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' }); // e.g., 'Jul'
    const year = date.getFullYear();

    // Determine the suffix for the day
    let suffix;
    if (day > 3 && day < 21) suffix = 'th'; // for 4-20
    else {
        switch (day % 10) {
            case 1: suffix = 'st'; break;
            case 2: suffix = 'nd'; break;
            case 3: suffix = 'rd'; break;
            default: suffix = 'th';
        }
    }

    return `${day}${suffix} ${month} ${year}`;
}

export default formatDate;