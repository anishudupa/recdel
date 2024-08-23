import fs from 'fs';
export const readFilesFromPath = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if(err) reject(err);
            else resolve(files)
        })
    })
}

export const reqFiles = (allFiles, exts) => {
    let reqFiles = []
    exts.forEach(ext => {
       const filesOfExt =  allFiles.filter(file => {
            const fileExt = file.split('.')
            return fileExt[1] == ext;
        })
        reqFiles.push(...filesOfExt)
    });
    return reqFiles
}

export const deleteFiles =  async (files, _path) => {
    const deleteFile = (_path) => {
        fs.unlink(_path, (err) => {
            if(err) throw err
        })
    }
    
   try {
        files.forEach(file => {
            const filePath = _path[_path.length - 1] === '/' ? `${_path}${file}` : `${_path}/${file}`;
            deleteFile(filePath);
        })
   } catch (error) {
        throw error
   }
}