import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
// import ttt from '../../../../../../public/example.xlsx'
export default function handler(req: NextApiRequest, res: NextApiResponse) {


   const directoryPath = path.join(
     __dirname,
     '../../../../../../public/example.xlsx'
   );
  fs.stat(directoryPath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.isFile(), 'file'); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    stats.size; // 1024000 //= 1MB
  });
  // Utiliser __dirname pour obtenir le chemin absolu du fichier actuel
  const filePath = path.join(__dirname, 'example.xlsx');
//  const filePath = path.join(process.cwd(), 'public', 'example.xlsx');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read file' });
      return;
    }
    console.log(res,res);
    
    res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.send(data);
  });
}
