const express = require("express");
const firebase = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const firebaseConfig = require("./src/firebase.config.js");

const app = express();
const port = 3000;
app.use(express.json());
// Initialize Firebase
firebase.initializeApp(firebaseConfig.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Middleware to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Function to generate current date and time for unique naming
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${date} ${time}`;
}

// Route for uploading file
app.post("/upload-file", upload.single("file"), async (req, res) => {
    try {
        if (req.file.mimetype !== 'image/png') {
            return res.status(400).send({
                message: 'Only PNG files are allowed.'
            });
        }
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname} ${dateTime}`);

        // Metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        // Grab the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});


app.post("/upload-multiple-files", upload.array("file", 5), async (req, res) => {
    try {
        const uploadedFiles = await Promise.all(
            req.files.map(async (file) => {
                const dateTime = giveCurrentDateTime();
                const storageRef = ref(storage, `files/${file.originalname} ${dateTime}`);

                const metadata = {
                    contentType: file.mimetype,
                };

                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);

                console.log('File successfully uploaded.');
                return {
                    name: file.originalname,
                    type: file.mimetype,
                    downloadURL: downloadURL
                };
            })
        );

        return res.send({
            message: `Uploaded ${uploadedFiles.length} file(s) to Firebase storage`,
            files: uploadedFiles
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

app.post("/download-multiple-files", async (req, res) => {
    const { fileNames } = req.body; // Receive list of file names from body

    if (!Array.isArray(fileNames) || fileNames.length === 0) {
        return res.status(400).send({ error: 'Please provide an array of file names.' });
    }

    try {
        const downloadURLs = await Promise.all(
            fileNames.map(async (fileName) => {
                const storageRef = ref(storage, `files/${fileName}`);

                // Get the download URL
                const downloadURL = await getDownloadURL(storageRef);
                return {
                    fileName: fileName,
                    downloadURL: downloadURL
                };
            })
        );

        res.send({
            message: 'Download URLs generated',
            files: downloadURLs
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});


// Route for downloading file by its name
app.get("/download-file/:fileName", async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const storageRef = ref(storage, `files/${fileName}`);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        res.send({
            message: 'file download URL generated',
            downloadURL: downloadURL
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
