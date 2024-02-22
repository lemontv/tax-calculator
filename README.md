# Tax Calculator

## Setting Up the Frontend

- Clone this repository to your local machine.
- Navigate into the project directory.
- Install the required dependencies:

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

- Run the project with docker

```bash
docker build -t tax-calculator .
docker run -it --rm -p 3000:80 tax-calculator
```

- Run the project with docker compose

```bash
docker compose up
```

The application should now be running and accessible at http://localhost:3000.

Testing
The project includes a suite of automated tests covering critical functionalities. Run the tests using:

```
npm test
```
