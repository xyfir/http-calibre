const escape = require("js-string-escape");
const exec = require("child_process").exec;

/*
    GET libraries/:lib/books/:book/metadata
    REQUIRED
        author: string, title: string
        OR
        isbn: string
    RETURN
        OK = Metadata..., ERROR = 1
    DESCRIPTION
        Fetches an ebook's metadata
*/
module.exports = function(req, res) {
    
    const options = req.query.isbn
        ? `-i "${escape(req.query.isbn)}"`
        : `-a "${escape(req.query.author)}" -t "${escape(req.query.title)}"`;
    
    exec(
        `fetch-ebook-metadata ${options}`,
        (err, data, stderr) => {
            if (err || data.indexOf("No results found") != -1)
                res.send('1');
            else
                res.send(data);
        }
    );
    
};