import express, { Router } from 'express';
import { Logger } from 'pino';
import { Readable } from 'stream';
import csvParser from 'csv-parser';
import { UploadedFile } from 'express-fileupload';
import { CsvDataDto } from './dto/csv-data.dto';
import { getLoadFileCommand } from '../../../../commands/csv-loader/load-file';
import { ICsvDataRepository } from '../../../../ports/csv-data-repository';
import { getGetCsvDataQuery } from '../../../../queries/csv-data/get-csv-data';

type CsvLoaderRouterParameters = {
  logger: Logger;
  csvDataRepository: ICsvDataRepository;
};

export const csvRouter = async ({ logger, csvDataRepository }: CsvLoaderRouterParameters): Promise<Router> => {
  const csv = express.Router();

  csv.post('/load', async (req, res) => {
    const csvFiles = req.files as { [fieldname: string]: UploadedFile };

    if (!csvFiles || Object.keys(csvFiles).length === 0) {
      res.status(404).send('File was not provided');

      return;
    }

    const results: CsvDataDto[] = [];
    const bufferStream = new Readable();

    for (const file of Object.values(csvFiles)) {
      const csvFileData = file.data;

      bufferStream.push(csvFileData);
      bufferStream.push(null);

      break;
    }

    bufferStream
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', async () => {
        const createCsvData = getLoadFileCommand({
          logger,
          csvDataRepository,
        });

        const createResult = await createCsvData({
          data: results,
        });

        if (createResult instanceof Error) {
          res.status(500).send('File was not loaded!');
        }

        res.status(201).send('File was loaded!');
      });
  });

  csv.get('/', async (req, res) => {
    const getCsvData = getGetCsvDataQuery({
      csvDataRepository,
    });

    const csvData = await getCsvData();

    if (csvData instanceof Error) {
      res.status(500).send('Unable to get Csv Data!');
    }

    res.status(201).json({
      data: csvData,
    });
  });

  return csv;
};
