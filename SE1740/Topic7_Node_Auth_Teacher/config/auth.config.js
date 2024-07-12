module.exports = {
    secret: "Khoa bi mat dung de sinh access token",
    // jwtExpiration: 3600,            // 1 hour
    // jwtRefreshExpiration: 86400     // 24 hours
    jwtExpiration: 120,                 // 2 minutes
    jwtRefreshExpiration: 240           // 4 minutes
};