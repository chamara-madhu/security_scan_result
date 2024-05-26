## Installation

```bash
npm install
```

Create env from [.env.example](https://github.com/chamara-madhu/security_scan_result/blob/main/api/.env.example) and fill according to it needs

Don't forget to use postgres as the DB

## Folder structure

```bash
.
├── ...
├── src
│   ├── app             # Business logics and 3rd part services
│   ├── database        # Entities and migrations
└── ...
```

## Running the app in local

```bash
# development
npm run start

# watch mode
npm run start:dev
```

## Commands

- #### Fix format issues
  ```bash
  npm run format
  ```
- #### Fix lint issues
  ```bash
  npm run lint
  ```
- #### Run migration
  ```bash
  npm run migration:run
  ```
- #### Create migration
  ```bash
  npm run migration:generate ./src/database/migration/<migration_name>
  ```
