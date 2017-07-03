module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true,
        tableName: "burgers",
        classMethods: {
            associate: function(models) {
                Burger.belongsTo(models.Customer);
            }
        }
    });
    return Burger;
};
