const cloudinary = require('cloudinary').v2;

const deleteFile = (imgUrl) => {
    const imgSplited = imgUrl.split('/'); //divide la url en un array de cadenas por cada separador
    const nameSplited = imgSplited[imgSplited.length - 1].split('.'); //hacemos otro split para separar el nombre de extension
    const folderSplited = imgSplited[imgSplited.length -2]; //obtenemos la penultima cadena, la carpeta
    const imgToDelete = `${folderSplited}/${nameSplited[0]}`; //generamos un valor con carpeta y nombre del archivo
    cloudinary.uploader.destroy(imgToDelete, () => {   //borramos la imagen
        console.log("image deleted in cloudinary");
    })
}

module.exports = {deleteFile};