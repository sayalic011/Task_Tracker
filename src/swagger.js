import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Required for ES Modules to get __dirname
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Daily Task Checklist API",
      version: "1.0.0",
      description: "Task Tracking App with JWT Authentication & RBAC"
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ],

    /**
     * 🔐 JWT AUTH CONFIGURATION (THIS ENABLES AUTHORIZE BUTTON)
     */
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    /**
     * Apply JWT globally (can be overridden per route)
     */
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  /**
   * 👇 VERY IMPORTANT
   * Swagger will scan all route files for @swagger comments
   */
  apis: [path.join(__dirname, "routes/*.js")]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerDocs = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true
    })
  );
};
