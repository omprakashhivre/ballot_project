

module.exports = (sequelize, DataTypes) => {

    const query = sequelize.define("query", {

        queryId: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },

        queryName: {

            type: DataTypes.STRING,

            require: true

        },

        queryStartDate: {

            type: DataTypes.STRING,

            require: true

        },

        queryEndDate: {

            type: DataTypes.STRING,

            require: true

        },
        userId: {

            type: DataTypes.INTEGER,

            require: true

        }

    }, {

        tableName: 'query',

        // timestamps:false,

        // updatedAt:false

        createdAt: 'query_create_date',

        updatedAt: 'query_modified_date'

    });
}