const connection = require('./BaseModel')

module.exports = {
    async executeTransaction(callback) {
        connection.beginTransaction();
        try {
            const { res, error, } = await callback()
            error ? connection.rollback() : connection.commit()

            return { res: res, require: !error, }
        } catch (err) {
            console.log(" catch error :: ", err);

            connection.rollback()

            return { err: err, require: false, }
        }
    }
}; 