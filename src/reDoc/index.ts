import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { RedocOptions, RedocModule } from 'nestjs-redoc';
import * as docApi from 'openapi.json';

class ReDoc {
  static async execute(app: INestApplication): Promise<void> {
    const { info, openapi, components, paths } = docApi;

    const options: Omit<OpenAPIObject, 'paths'> = {
      openapi,
      info,
    };

    const document = SwaggerModule.createDocument(app, options);

    const redocOptions: RedocOptions = {
      title: 'Nest Prisma API',
      logo: {
        url: 'https://uploads-ssl.webflow.com/5cf8fd7298b9ff4a6efbdb56/5e97e8492344691129e0f064_Alexandria-Logo-Icon-Square_white_1000px.png',
        backgroundColor: '#Fafafa',
        altText: 'My Blog',
      },
      sortPropsAlphabetically: true,
      hideDownloadButton: true,
      hideHostname: true,
      tagGroups: [
        {
          name: 'Core resources',
          tags: ['Posts', 'Users'],
        },
      ],
    };

    Object.assign(document, {
      components,
      paths,
    });

    await RedocModule.setup('docs', app, document, redocOptions);
  }
}

export default ReDoc;
