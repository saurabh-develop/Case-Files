import mongoose from "mongoose";
import grid from 'gridfs-stream';

const url = 'http://localhost:8000';



export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(404).json({
            msg: "File not found"
        });
    }

    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);
}

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename : request.params.fileId});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({ msg: 'Internal server error' });
    }
};
