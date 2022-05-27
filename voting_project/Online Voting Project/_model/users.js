module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {

        userId: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true,

        

        },

        firstName: {

            type: DataTypes.STRING,

            require:true

        },

        lastName: {

            type: DataTypes.STRING,

            defaultValue: null

        },

        emailId: {

            type: DataTypes.STRING,

            require: true

        },

        password: {

            type: DataTypes.STRING,

            require:true

        }

    }, {

        tableName: 'users',

        // timestamps:false,

        // updatedAt:false

        createdAt: 'user_created_date',

        updatedAt: 'user_modified_date'

    });
}