import type { NextApiRequest, NextApiResponse } from 'next';
// import fs from 'fs';
import path from 'path';
 import { readFile } from 'fs/promises';
//  import path from 'path';
// import oui from '../../../../public/'
export async function GET() {
    //  const directoryPath = path.join(__dirname, '../../../../public/example.xlsx');
    const filePath = path.join(__dirname, 'example.xlsx');
//   const filePath = path.join(process.cwd(), 'path', 'to', 'your', 'file.xlsx');
console.log('directoryPath', filePath);

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//        res.status(500).json({ error: 'Failed to read file' });
//       console.log('err', err);

//       return;
//     }

//     res.setHeader('Content-Disposition', 'attachment; filename=file.xlsx');
//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );
//     res.send(data);
    //   });
    
      const buffer = await readFile(
        path.join(process.cwd(), 'public/exemple.xlsx')
      );

      // set the headers to tell the browser to download the file
      const headers = new Headers();
      // remember to change the filename `test.pdf` to whatever you want the downloaded file called
      headers.append(
        'Content-Disposition',
        'attachment; filename="exemple.xlsx"'
      );
      headers.append(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );

      return new Response(buffer, {
        headers,
      });
}
