# Mu-Sick API

This NestJS application showcases a full-stack backend service that integrates:

- Email functionality with nodemailer and React-based email templates
- MongoDB database connection via mongoose
- Swagger API documentation for easy interface exploration
- Input validation using class validators

## Features

- Email Service: Sends emails via nodemailer using a provider-based transporter for secure and reliable email functionality.
- React-Email Templates: Dynamic and flexible email templates are created using react-email, making template management simple and efficient.
- MongoDB Integration: The application connects to a MongoDB database through mongoose and runs the database inside a Docker container.
- Input Validation: Ensures API requests are properly validated using class-validator for robust and secure inputs.
- Swagger API Docs: Provides Swagger documentation accessible at /api-docs, making it easier to explore and test API endpoints.

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/nestjs-app.git
cd nestjs-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up the .env File**

```bash
cp .env.example .env
```

Populate the .env file with the necessary environment variables:

```env
PORT=4000
HOST=localhost
DB_URI=mongodb://localhost:27017

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_FROM=your-email@example.com
EMAIL_PASS=your-email-password
EMAIL_SUBJECT='Thank you for participiation'
```

4. **Run MongoDB in Docker**

To start a MongoDB container using Docker, use the provided docker-compose.yml file.

```bash
docker-compose up -d
```

This will start MongoDB and map port 27017 on your host machine to the container.

5. **Run the Application**

```bash
npm run start
```

The application will run at http://localhost:3000, and MongoDB will be available at mongodb://localhost:27017.

### MongoDB Connection via Mongoose

This application connects to MongoDB using mongoose, a powerful and easy-to-use ODM (Object Data Modeling) library.

The MongoDB connection string is defined in the .env file using the DB_URI variable. Here's an example connection:

```ts
MongooseModule.forRoot(process.env.MONGO_URI);
```

The database will store persistent data for your application's models, such as emails, users, and other records.

### Swagger API Documentation

You can access the Swagger documentation at:

```bash
http://localhost:3000/api-docs
```

Swagger is automatically generated for all the application’s API routes, making it easy to test the endpoints and see the available input/output formats.

### Input Validation
The application uses the class-validator package for input validation in DTOs (Data Transfer Objects). It ensures that requests are properly formatted and meet the required validation rules, providing robust error handling.

Example usage of a class-validator:

```ts
import { IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
}
```

In this case, the CreateUserDto ensures that the age field is an integer between 1 and 150.

### Sending Emails with React-Email Templates
As part of the email service, the application uses nodemailer to send emails via an SMTP server. The email templates are powered by the react-email library, which allows the use of React components to render dynamic email content. This makes email template management and customization much easier.

### Email Template Location

All email templates are located in the src/mail/templates directory. These templates can be customized and managed using React components, offering flexibility for dynamic content generation.

Example template component (src/mail/templates/WelcomeEmail.tsx):

```tsx
import { Email, Body, Text } from 'react-email';

export const WelcomeEmail = ({ name }: { name: string }) => (
  <Email>
    <Body>
      <Text>Hello {name},</Text>
      <Text>Welcome to our platform!</Text>
    </Body>
  </Email>
);
```

### How to Send Emails

The transporter and templates are used together to send emails. The MailService handles the logic for sending emails with dynamic React templates.

```typescript
@Injectable()
export class MailService {
    constructor(
        @InjectTranposter() private readonly transporter: Transporter,
    ) {}

    async sendWelcomeEmail(to: string, name: string) {
        const html = renderEmail(<WelcomeEmail name={name} />); // Convert React template to HTML

        await this.transporter.sendMail({
          from: '"YourApp" <no-reply@yourapp.com>',
          to,
          subject: 'Welcome!',
          html,
        });
    }
}
```

### Rendering Templates
The react-email library's renderEmail function converts your React components into HTML to be sent as the email content.

```typescript
import { renderEmail } from 'react-email-renderer';
import { WelcomeEmail } from './templates/WelcomeEmail';

const html = renderEmail(<WelcomeEmail name="John" />);
```

### Docker Setup for MongoDB

The application runs MongoDB via Docker, defined in the docker-compose.yml file:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
    driver: local
```

To start MongoDB, simply run:

```bash
docker-compose up -d
```

This will spin up a MongoDB container and create a persistent volume for storing database data.

### License

This project is licensed under the MIT License.
