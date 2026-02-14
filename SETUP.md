# Setup Instructions

## Prerequisites

- Node.js (version 18.x or 20.x)
- npm (comes with Node.js)
- Git

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/retirement-withdrawal-simulator.git
   cd retirement-withdrawal-simulator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Development Workflow

### Running tests in watch mode:
```bash
npm run test:watch
```

### Running tests with coverage:
```bash
npm run test:coverage
```

### Linting:
```bash
npm run lint
```

### Auto-fix linting issues:
```bash
npm run lint:fix
```

### Format code:
```bash
npm run format
```

### Check formatting:
```bash
npm run format:check
```

## Project Structure

```
retirement-withdrawal-simulator/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI pipeline
├── src/                    # Source code
├── dist/                   # Compiled output (generated)
├── coverage/               # Test coverage reports (generated)
├── node_modules/           # Dependencies (generated)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── jest.config.js
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm test && npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Continuous Integration

The project uses GitHub Actions for CI/CD. On every push and pull request:
- Code is linted
- Formatting is checked
- Tests are run
- Coverage reports are generated
- Build is verified

## Troubleshooting

### Installation Issues

If you encounter issues during `npm install`:
- Clear the npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Build Issues

If the build fails:
- Ensure TypeScript is installed: `npm list typescript`
- Check for TypeScript errors: `npm run build`
- Verify `tsconfig.json` is properly configured

### Test Issues

If tests fail:
- Run tests in verbose mode: `npm test -- --verbose`
- Check individual test files for specific failures
- Ensure all dependencies are installed
