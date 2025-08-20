# CELLMART Test Configuration Examples

## Jest Configuration (jest.config.js)

```javascript
module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module name mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.d.ts'
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  },
  
  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node']
};
```

## Cypress Configuration (cypress.config.js)

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL for testing
    baseUrl: 'http://localhost:3000',
    
    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Test files location
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file
    supportFile: 'cypress/support/e2e.js',
    
    // Video recording
    video: true,
    videoCompression: 32,
    
    // Screenshots
    screenshotOnRunFailure: true,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Environment variables
    env: {
      apiUrl: 'http://localhost:5000/api',
      adminEmail: 'admin@cellmart.test',
      testPassword: 'TestPassword123!'
    },
    
    setupNodeEvents(on, config) {
      // Task registration
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      
      return config;
    }
  },
  
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}'
  }
});
```

## ESLint Testing Configuration (.eslintrc.test.js)

```javascript
module.exports = {
  env: {
    jest: true,
    'cypress/globals': true
  },
  
  extends: [
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:cypress/recommended'
  ],
  
  plugins: [
    'jest',
    'testing-library',
    'cypress'
  ],
  
  rules: {
    // Jest rules
    'jest/expect-expect': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/prefer-to-have-length': 'warn',
    
    // Testing Library rules
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debug': 'warn',
    
    // Cypress rules
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn'
  },
  
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true
      }
    },
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true
      }
    }
  ]
};
```

## GitHub Actions CI/CD Configuration (.github/workflows/test.yml)

```yaml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        cache-dependency-path: cellmart-fe/package-lock.json
    
    - name: Install dependencies
      run: |
        cd cellmart-fe
        npm ci
    
    - name: Run linting
      run: |
        cd cellmart-fe
        npm run lint
    
    - name: Run unit tests
      run: |
        cd cellmart-fe
        npm test -- --coverage --watchAll=false
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: cellmart-fe/coverage/lcov.info
        flags: frontend

  backend-tests:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        env:
          MONGO_INITDB_ROOT_USERNAME: test
          MONGO_INITDB_ROOT_PASSWORD: test
        ports:
          - 27017:27017
        options: >-
          --health-cmd mongo
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js 18.x
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
        cache: 'npm'
        cache-dependency-path: cellmart-be/package-lock.json
    
    - name: Install dependencies
      run: |
        cd cellmart-be
        npm ci
    
    - name: Run backend tests
      run: |
        cd cellmart-be
        npm test -- --coverage
      env:
        NODE_ENV: test
        MONGODB_URI: mongodb://test:test@localhost:27017/cellmart-test?authSource=admin
        JWT_SECRET: test-jwt-secret
        OPENAI_API_KEY: test-api-key

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js 18.x
      uses: actions/setup-node@v3
      with:
        node-version: 18.x
    
    - name: Install dependencies
      run: |
        cd cellmart-fe
        npm ci
    
    - name: Build application
      run: |
        cd cellmart-fe
        npm run build
    
    - name: Run Cypress tests
      uses: cypress-io/github-action@v5
      with:
        working-directory: cellmart-fe
        start: npm run preview
        wait-on: 'http://localhost:4173'
        browser: chrome
    
    - name: Upload Cypress screenshots
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: cypress-screenshots
        path: cellmart-fe/cypress/screenshots
    
    - name: Upload Cypress videos
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: cypress-videos
        path: cellmart-fe/cypress/videos

  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
    
    - name: Upload result to GitHub Code Scanning
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: snyk.sarif
```

## Performance Testing Configuration (artillery.yml)

```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 10
      name: "Normal load"
    - duration: 60
      arrivalRate: 20
      name: "Peak load"
  
  defaults:
    headers:
      Content-Type: 'application/json'
  
  processor: "./test-functions.js"

scenarios:
  - name: "Homepage Load Test"
    weight: 30
    flow:
      - get:
          url: "/"
      - think: 3
      - get:
          url: "/api/phones"

  - name: "Search Functionality Test"
    weight: 40
    flow:
      - get:
          url: "/"
      - think: 2
      - post:
          url: "/api/search"
          json:
            query: "budget smartphone"
      - think: 5

  - name: "Product Listing Test"
    weight: 30
    flow:
      - get:
          url: "/products"
      - think: 3
      - get:
          url: "/api/phones"
          qs:
            limit: 12
            page: 1
```

## Test Data Configuration (test-data.json)

```json
{
  "users": {
    "admin": {
      "email": "admin@cellmart.test",
      "password": "AdminPass123!",
      "role": "admin"
    },
    "staff": {
      "email": "staff@cellmart.test",
      "password": "StaffPass123!",
      "role": "staff"
    },
    "customer": {
      "email": "customer@cellmart.test",
      "password": "CustomerPass123!",
      "role": "customer"
    }
  },
  
  "products": {
    "samplePhone": {
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "price": 999,
      "description": "Latest flagship smartphone with A17 Pro chip",
      "specifications": {
        "display": "6.1-inch Super Retina XDR",
        "storage": "128GB",
        "camera": "48MP Main + 12MP Ultra Wide",
        "battery": "Up to 23 hours video playback"
      }
    }
  },
  
  "searchQueries": [
    "budget smartphone under 300",
    "gaming phone with good camera",
    "iPhone alternatives",
    "android phone long battery life",
    "phone for elderly users",
    "latest flagship smartphone 2024"
  ],
  
  "testScenarios": {
    "productManagement": {
      "create": {
        "validData": {
          "name": "Test Phone Model",
          "brand": "TestBrand",
          "price": 599,
          "description": "Test phone description"
        },
        "invalidData": {
          "name": "",
          "brand": null,
          "price": -100,
          "description": "x".repeat(1001)
        }
      }
    }
  }
}
```

## Environment Configuration (.env.test)

```bash
# Application Configuration
NODE_ENV=test
PORT=3001

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cellmart-test
MONGODB_TEST_DB=cellmart-test

# Authentication Configuration
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxx

# AI Configuration
OPENAI_API_KEY=sk-test-xxxxxxxxx
OPENAI_ORG_ID=org-xxxxxxxxx

# Security Configuration
JWT_SECRET=test-jwt-secret-key
ENCRYPTION_KEY=test-encryption-key

# External Services
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Test Configuration
TEST_TIMEOUT=30000
COVERAGE_THRESHOLD=85
E2E_HEADLESS=true
TAKE_SCREENSHOTS=true

# Performance Testing
PERFORMANCE_BUDGET_LOAD_TIME=3000
PERFORMANCE_BUDGET_API_TIME=2000
LOAD_TEST_DURATION=300
LOAD_TEST_USERS=50
```

## Package.json Test Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --watchAll=false --ci",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:performance": "artillery run artillery.yml",
    "test:security": "npm audit && snyk test",
    "test:all": "npm run test:ci && npm run test:e2e && npm run test:performance",
    "lint:test": "eslint **/*.test.js **/*.spec.js",
    "prettier:test": "prettier --check **/*.test.js **/*.spec.js"
  }
}
```

---

**Note**: These configuration files are examples based on the CELLMART project structure and requirements. Actual implementation may require adjustments based on specific environment needs and testing requirements.