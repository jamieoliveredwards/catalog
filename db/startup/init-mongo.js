const products = [

];

connection = new Mongo();
db = connection.getDB('admin');

db.createUser(
    {
        user: 'localdev',
        pwd: 'password',
        roles: [
            {
                role: 'userAdminAnyDatabase',
                db: 'admin'
            },
            'readWriteAnyDatabase'
        ]
    }
)

db.createCollection('products');
db.products.insertMany([
    {
        "sku": 1,
        "name": "Product One",
        "description": "Product One description",
        "price": 1.11
    },
    {
        "sku": 2,
        "name": "Product Two",
        "description": "Product Two description",
        "price": 2.22
    },
    {
        "sku": 3,
        "name": "Product Three",
        "description": "Product Three description",
        "price": 3.33
    },
    {
        "sku": 4,
        "name": "Product Four",
        "description": "Product Four description",
        "price": 4.44
    },
    {
        "sku": 5,
        "name": "Product Five",
        "description": "Product Five description",
        "price": 5.55
    },
    {
        "sku": 6,
        "name": "Product Six",
        "description": "Product Six description",
        "price": 6.66
    }
]);