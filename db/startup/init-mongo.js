connection = new Mongo();
adminDb = connection.getDB('admin');
db = connection.getDB('catalogue');

const today = new Date();

adminDb.createUser(
    {
        user: '$API_USER'.length > 0 ? '$API_USER' : 'api_user',
        pwd: '$API_PASS'.length > 0 ? '$API_PASS' : 'password',
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

db.createCollection('promotions');
db.promotions.insertMany([
    {
        discountPercentage: 30,
        promoCode: 'summersale',
        validFrom: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        validUntil: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    },
    {
        discountPercentage: 10,
        promoCode: 'studentcard',
        validFrom: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        validUntil: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    },
    {
        discountPercentage: 10,
        promoCode: 'expired',
        validFrom: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        validUntil: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    },
    {
        discountPercentage: 10,
        promoCode: 'future',
        validFrom: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
        validUntil: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    }
]);
