## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test application
# Display all instances where a patient&#39;s heart rate reading exceeded 100 bpm
GET /patients/high-heart-rate-events

# /patients/1/analytics?start=2024-03-01T00:00:00Z&end=2024-03-02T00:00:00Z
GET /patients/:id/analytics

# Track how many times each patient’s data has been requested.
GET /patients/:id

# Get All patients
GET /patients
```
