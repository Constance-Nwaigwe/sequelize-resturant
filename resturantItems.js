const {db, DataTypes, Model} = require('./db');

class Resturant extends Model {}
class Menu extends Model {}
class MenuItems extends Model {}

Resturant.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
},{
    sequelize: db
})

Menu.init({
    title: DataTypes.STRING,
    calories: DataTypes.INTEGER
},{
    sequelize: db
})

MenuItems.init({
    recipe: DataTypes.STRING,
    cost: DataTypes.INTEGER
},{
    sequelize: db
})

MenuItems.belongsTo(Menu)
Menu.hasMany(MenuItems)
Menu.belongsTo(Resturant)
Resturant.hasMany(Menu)

module.exports = {Resturant, Menu, MenuItems};