async function allAccess(req, res, next){
    res.send("User all access");
}

async function memberAccess(req, res, next){
    res.send("Member access");
}

async function modAccess(req, res, next){
    res.send("Moderator access");
}

async function adminAccess(req, res, next){
    res.send("Admin access");
}

const userController = {
    allAccess, memberAccess, modAccess, adminAccess
};

module.exports = userController;