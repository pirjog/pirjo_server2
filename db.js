const maria = require("mariadb/callback");
/*
const hostName="maria.westeurope.cloudapp.azure.com";
const dbUser="testi";
const dbPassword="mariadb1";
*/
const hostName = "localhost";
const dbUser = "root";
const dbPassword = "";
const dbName = "placesapp";

const sendQuery = (sql, onError, onSuccess, doCommit = false) => {
    const con = maria.createConnection({
        host: hostName,
        user: dbUser,
        password: dbPassword,
        database: dbName,
    });

    con.connect((err) => {
        if (err) {
            onError(err);
        } else {
            con.query(sql, (err, res) => {
                if (err) {
                    onError(err);
                    con.end();
                    return;
                }
                onSuccess(res);
                if (doCommit) {
                    con.commit();
                }
                con.end();
            });
        }
    });
};

const getAllPlaces = (onError, onSuccess) => {
    sendQuery("SELECT * FROM Places", onError, onSuccess);
};

const addPlace = ({ name, userId, lat, lon }, onError, onSuccess) => {
    sendQuery(
        `INSERT INTO Places 
        (Name, UserID, Latitude, Longitude)
        VALUES
        ('${name}',${userId},${lat},${lon})`,
        onError,
        onSuccess,
        true
    );
};

const deletePlace = (id, onError, onSuccess) => {
    sendQuery(
        `DELETE FROM Places 
        WHERE ID=${id}`,
        onError,
        onSuccess,
        true
    );
};

module.exports = {
    getAllPlaces,
    addPlace,
    deletePlace,
};
