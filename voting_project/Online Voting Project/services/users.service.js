

const db = require("");

//registration
exports.register = (data, callback) => {
  console.log(data);
  db.query(
    `INSERT INTO users(firstName , lastName, emailId, password) VALUES (?,?,?,?)`,
    [data.firstName, data.lastName, data.emailId, data.password],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `Registration successful`);
    }
  );
};


exports.login = (data, callback) => {
  console.log(data);
  db.query(
    `SELECT userId,firstName, lastName FROM users WHERE emailId = ? AND password = ?`,
    [data.emailId, data.password],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      if (results.length > 0) {
        return callback(null, results);


      } else {
        return callback("Invalid credentials");
      }
    }
  );
};


// Adding Query
exports.addquery = (data, callback) => {

  db.query(

    `INSERT INTO query(queryName , queryStartDate, queryEndDate) VALUES (?,?,?)`,

    [data.queryName, data.queryStartDate, data.queryEndDate],

    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, results);

    }

  );

};


// Adding Options
exports.addoptions = (data, callback) => {

  db.query(

    `INSERT INTO options(optionId, queryId, options) VALUES (?,?,?)`,

    [data.optionId, data.queryId, data.options],

    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, `Options added successfully`);

    }

  );

};

//voting
exports.castvote = (data, callback) => {

  db.query(

    `INSERT INTO vote(queryId, optionId, userId) VALUES (?,?,?)`,

    [data.queryId, data.optionId, data.userId],

    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, `vote casted successfully`);

    }

  );

};

//get All Users
exports.getAllUsers = (data, callback) => {
  db.query(

    `select firstName, lastName from users`,

    (error, results, fields) => {

      if (error) {

        return callback(error);
      }

      return callback(null, results);
    }

  );

};

//get All Options
exports.getAlloptions = (data, callback) => {
  db.query(
    `select optionId, options, queryId from options where queryId = ?`, [data.queryId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};


//get All query
exports.getAllquery = (data, callback) => {
  db.query(
  
    `select queryId, queryName, querystartdate , queryenddate from query ` ,   
 
    (error, results, fields) => {

      if (error) {

        return callback(error);
      }
      
      return callback( null,results);
    }

   );

};

exports.getFilteredQuery = (data, callback) => {
  db.query(
  
    `select queryId, queryName, querystartdate , queryenddate from query where DATE(queryenddate) > DATE_FORMAT(now(),GET_FORMAT(DATETIME,'ISO'));
    ` ,   
 
    (error, results, fields) => {

      if (error) {

        return callback(error);
      }
      
      return callback( null,results);
    }

   );

};


//get Id list
exports.getIdlist = (data, callback) => {
  db.query(

    `select queryId from vote where userId = ?`, [data.userId],

    (error, results, fields) => {

      if (error) {

        return callback(error);
      }

      return callback(null, results);
    }

  );

};

//get  votes
exports.gettotalvotes = (data, callback) => {

  db.query(

    `SELECT queryId, sum(totalvotes)from vote `,
    (error, results, fields) => {

      if (error) {

        return callback(error);
      }

      return callback(null, results);

    }

  );

};
exports.updatepassword = (data, callback) => {

  console.log(data);

  db.query(

    `UPDATE users SET password = ? WHERE  emailId = ? ;`,

    [data.password, data.emailId],

    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, `Password updated successfully`);

    }

  );

};

exports.deletequery = (data, callback) => {
  console.log(data);
  db.query(
    `DELETE from options where optionId = ? `,
    [data.optionId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `option deleted successfully`);
    }

  );

};

exports.gettotalvote = (data, callback) => {



  db.query(



    'SELECT count (optionId) AS "totalVote" ,queryId FROM vote GROUP BY queryId    ',

    [],

    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, results);

    }

  );

};

exports.totalVote = (data, callback) => {
  db.query(

    'SELECT count (optionId) AS "totalVote" from vote where queryId = ?  ',
    [data.queryId],
    (error, results, fields) => {

      if (error) {

        return callback(error);

      }

      return callback(null, results);

    }

  );

};


exports.voteforsingleoption = (data, callback) => {
  db.query(

    'SELECT count(voteId) AS "voteforsingleoption" from vote where optionId = ?  ',
    [data.optionId],
    (error, results, fields) => {

      if (error) {

        return callback(error);

      }
      console.log(results);
      return callback(null, results);

    }

  );

};

exports.deletequery = (data, callback) => {
  console.log(data);
  db.query(
    `DELETE from query where queryId = ?  `,
    [data.queryId],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, ` deleted successfully`);
    }

  );

};
