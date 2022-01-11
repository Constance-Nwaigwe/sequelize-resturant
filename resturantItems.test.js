const {db} = require('./db');
const {Resturant, Menu, MenuItems} = require('./resturantItems');

describe('testing resturantItems classes', () => {
    beforeAll(async () => {
        await db.sync({force: true})
    })
    test('Resturant class can create name and location', async () => {
        const testres = await Resturant.create({name: 'Little Ceasar', location: 'Rockvile'})
        expect(testres.name).toBe('Little Ceasar')
        expect(testres.location).toBe('Rockvile')
    })

    test('Menu class can create title and calories', async () => {
        const testmenu = await Menu.create({title: 'Pizza', calories: 350})
        expect(testmenu.title).toBe('Pizza')
        expect(testmenu.calories).toBe(350)
    })

    test('MenuItems class can create recipe and cost', async () => {
        const testitems = await MenuItems.create({recipe: 'Cheese', cost: 1.99})
        expect(testitems.recipe).toBe('Cheese')
        expect(testitems.cost).toBe(1.99)
    })

    test('Many MenuItems can be in one Menu', async () => {
        const testitems = await MenuItems.create({recipe: 'Cheese', cost: 1.99})
        const testitems2 = await MenuItems.create({recipe: 'tomatoe', cost: 0.99})
        const testitems3 = await MenuItems.create({recipe: 'flour', cost: 2.99})
        const testmenu = await Menu.create({title: 'Pizza', calories: 350})

        await testmenu.addMenuItems(testitems)
        await testmenu.addMenuItems(testitems2)
        await testmenu.addMenuItems(testitems3)

        const getmenu = await testmenu.getMenuItems()
        expect(getmenu.length).toBe(3)
    })

    test('Many Menu can be in one resturant', async () => {
        const testmenu = await Menu.create({title: 'Pizza', calories: 350})
        const testmenu2 = await Menu.create({title: 'BBQ Wings', calories: 250})
        const testmenu3 = await Menu.create({title: 'Bread Sticks', calories: 150})
        const testres = await Resturant.create({name: 'Little Ceasar', location: 'Rockvile'})

        await testres.addMenu(testmenu)
        await testres.addMenu(testmenu2)
        await testres.addMenu(testmenu3)

        const getres = await testres.getMenus()
        expect(getres.length).toBe(3)
    })
})
