module.exports = {
    database: process.env.MONGODB_URL || 'mongodb://localhost:27017/admin',
    secret: process.env.SECRET || 'athwela'
}