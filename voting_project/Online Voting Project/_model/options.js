module.exports = (sequelize, DataTypes) => {

    const option = sequelize.define("option", {

        OptionId: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },
        QueryId: {

            type: DataTypes.INTEGER,

        },

        options: {

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