const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


function getPkg(packageName) {
    const packagePath = path.join(__dirname, 'packages', packageName);
    if (fs.existsSync(packagePath)) {
        if (fs.existsSync(path.join(packagePath, 'pkg.json'))) {
            return JSON.parse(fs.readFileSync(path.join(packagePath, 'pkg.json')));
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


// /api route
const apiRouter = express.Router();
apiRouter.get('/', (req, res) => {
    res.json({ message: 'Welcome to the BAT API!' });
});

// get package name
apiRouter.get('/pkg/:packageName', (req, res) => {
    const packageName = req.params.packageName;
    const packageData = getPkg(packageName);
    if (packageData) {
        res.json(packageData);
    } else {
        res.status(404).json({ status: 'error', message: 'Package not found' });
    }
});


app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});