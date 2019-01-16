export const serviceUrl = {
    url: 'https://limserver.herokuapp.com',
    admin: {
        addBook: '/addbook',
        getbook: '/getbook',
        deletebook: '/deletebook',
        updatebook: '/updatebook',
        adminlogin: '/adminlogin',
        allBooks: '/allbooks',
        allborrowedbooks: '/getallborrowedbooks',
        adminlogin: '/adminlogin'
    },
    user: {
        borrow: '/borrowbook',
        borrowedBooks: '/userbooks',
        returnBook: '/returnbook'
    }
}