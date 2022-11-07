export function errorMessajeSQL(error, results) {
    if (error) {
        console.log("*SQL* Error in sentence SQL!");
        console.error(error.sqlMessage);
        return;
    }
    console.log("*SQL OK!!* ");
};

export function errorMessage(errorCode,errorName,error ) { 
return `
    Database Not Connected
    Error code: ${errorCode}
    Error name: ${errorName}
    Error: ${error}
`;
};


export function configHeadersToRoutes(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


export const databaseMessages = {
    errorDatabase: "Internal database error",
    okDatabase: "OK"
}

