module.exports = (sequelize, DataTypes) => {

    const vote = sequelize.define("vote", {

        voteId: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },

        queryId: {

            type: DataTypes.INTEGER,

        },

        optionId: {

            type: DataTypes.INTEGER,

        },
        userId: {

            type: DataTypes.INTEGER,

        }
    }, {

        tableName: 'vote',

        // timestamps:false,

        // updatedAt:false

        createdAt: 'vote_created_date',

        updatedAt: 'vote_modified_date'

    });
}