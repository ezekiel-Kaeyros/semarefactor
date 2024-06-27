import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Le fichier est dans le même dossier que ce fichier
  const filePath = path.join(process.cwd(), 'pages', 'api', 'file.xlsx');
try {
         const directoryPath = path.join(
           __dirname,
           '../../../../public/exemple.xlsx'
         );
            console.log(directoryPath,directoryPath);
            
         fs.readFile(directoryPath, (err, data) => {
           if (err) {
             res.status(500).json({ error: 'Failed to read file' });
             return;
           }

           res.setHeader(
             'Content-Disposition',
             'attachment; filename=exemple.xlsx'
           );
           res.setHeader(
             'Content-Type',
             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
           );
           res.send(data);
         });
} catch (error) {
    console.log('error',error);
    
}
}
