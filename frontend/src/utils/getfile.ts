'use server';
import path from 'path';
import fs from 'fs';
import { newSessionImport } from './newImportSession';
// import fich from '../';
export const getFileHandler = async (link: string) => {
  // ;

  const directoryPath = path.join(
    __dirname,
    '../../../../../../../public/Rectangle 247.jpg'
  );
  // ;
fs.stat(directoryPath, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.isFile(),'file');
  ; // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
  // const fileNames: any[] = [];
  // let key: any[] = [];

  function readFileAsync(directoryPath: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(directoryPath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const newFile = new File([data], 'Rectangle 247.jpg', {
          type: 'image/png',
        });
        // ;

        resolve(newFile);
      });
    });
  }
  // // readFileAsync(directoryPath);
  // // readFileAsync(directoryPath);
  const responseFile = await readFileAsync(directoryPath);

  if (typeof responseFile === 'object' && responseFile instanceof File) {
    const response = await newSessionImport(
      responseFile?.size.toString(),
      responseFile,
      'https://bulkmessage.sem-a.com'
    );
    return response;
  }

  // Utilisation de la fonction readFileAsync
  // readFileAsync(directoryPath)
  //   .then((newFile) => {
  //     // ;
  //     // Tu peux utiliser newFile ici
  //   })
  //   .catch((err) => {
  //     console.error('Erreur lors de la lecture du fichier :', err);
  //   });

  try {
    // fs.readFile(directoryPath, (err, data) => {
    //   if (err) {
    //     console.error('Erreur lors de la lecture du fichier :', err);
    //     return;
    //   }
    //   // Crée une nouvelle instance de File avec le contenu lu
    //   const newFile = new File([data], 'Rectangle 247.jpg', {
    //     type: 'image/png',
    //   });
    //   // key.push(newFile)
    // const response = await newSessionImport(
    //   newFile.size.toString(),
    //   newFile,
    //   'https://bulkmessage.sem-a.com'
    // );
    //   // return newFile;
    // });
    // return key
  } catch (error) {}
  // ;

  // try {
  //      fs.readdir(directoryPath, function (err: any, files: any) {
  //          if (err) {
  //               // ;
  //            return err
  //         //  return // ;
  //        }
  //           files.forEach(function (file: any) {
  //             // ;

  //                //    fileNames.push(file.substring(0, file.indexOf('.')));
  //                fileNames.push(file)
  //        });
  //      });
  // } catch (error) {
  //      // ;
  // }

  // // ;
  // return fileNames
};
