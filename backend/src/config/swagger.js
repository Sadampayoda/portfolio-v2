import swaggerJsdoc from 'swagger-jsdoc';
import config from './app.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: config.app.name,
            version: '1.0.0',
            description: `API Documentation for ${config.app.name}`,
        },
        servers: [
            {
                url: `${config.app.url}/api/v1`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], // ← baca dokumentasi dari route files
}

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;