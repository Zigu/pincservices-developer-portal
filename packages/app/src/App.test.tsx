import React from 'react';
import { renderWithEffects } from '@backstage/test-utils';
import App from './App';

jest.mock('@backstage/core-components', () => {
  const originalModule = jest.requireActual('@backstage/core-components');

  // Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    SignInPage: jest.fn().mockReturnValue('SignInPage'),
  };
});

describe('App', () => {
  it('should render', async () => {
    process.env = {
      NODE_ENV: 'test',
      APP_CONFIG: [
        {
          data: {
            app: { title: 'Test' },
            backend: { baseUrl: 'http://localhost:7007' },
            techdocs: {
              storageUrl: 'http://localhost:7007/api/techdocs/static/docs',
            },
          },
          context: 'test',
        },
      ] as any,
    };

    const rendered = await renderWithEffects(<App />);
    expect(rendered.baseElement).toBeInTheDocument();
  });
});
